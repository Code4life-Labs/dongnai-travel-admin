import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PencilLine } from "lucide-react";

// Import components
import LoadingSpinner from "src/components/loading-spinner";
import { DatePickerForm } from "src/components/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";

// Import hooks
import { useAuth } from "src/hooks/use-auth";
import { UserAPI } from "src/objects/user/api";

// Import state
import { useBlogState } from "src/states/blog";

// Import utils
import { BlogUtils } from "src/objects/blog/utils";

type BlogFormValues = {
  authorId: string;
  typeId: string;
  mentionedPlaceIds: string[];
  name: string;
  content: string;
  coverImage: string;
  images: string[];
  readTime: number;
  isApproved: boolean;
};

type BlogFormDialogProps = {
  TriggerContent: (() => JSX.Element) | JSX.Element;
};

export default function BlogFormDialog({
  TriggerContent,
}: BlogFormDialogProps) {
  const { currentBlog, isResponding, addBlog, updateBlog, updateIsResponding } =
    useBlogState();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<BlogFormValues>({
    defaultValues: currentBlog
      ? BlogUtils.toModel(currentBlog)
      : {
          authorId: user?._id || "",
          typeId: "",
          mentionedPlaceIds: [],
          name: "",
          content: "",
          coverImage: "",
          images: [],
          readTime: 0,
          isApproved: false,
        },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (data) => {
    if (!user) return;
    updateIsResponding(true);

    try {
      let response;
      if (currentBlog) {
        response = await UserAPI.updateBlog(currentBlog._id, data);
        if (response) updateBlog(response.data);
      } else {
        response = await UserAPI.createBlog(data);
        if (response) addBlog(response.data);
      }
      setIsOpen(false);
    } finally {
      updateIsResponding(false);
    }
  };

  React.useEffect(() => {
    if (currentBlog) form.reset(BlogUtils.toModel(currentBlog));
  }, [currentBlog, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full">
        {typeof TriggerContent === "function" ? (
          <TriggerContent />
        ) : (
          TriggerContent
        )}
      </DialogTrigger>
      <DialogContent className="border-b border-b-2 pb-3 mb-6">
        <DialogHeader>
          <DialogTitle>{currentBlog ? "Edit Blog" : "Create Blog"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Blog Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Input type="text" placeholder="Blog title..." {...field} />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <Input type="text" placeholder="Cover image URL" {...field} />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="text"
                    placeholder="Comma-separated image URLs"
                    {...field}
                  />
                </FormItem>
              )}
            />

            {/* Read Time */}
            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="number"
                    placeholder="Estimated read time (minutes)"
                    {...field}
                  />
                </FormItem>
              )}
            />

            {/* Approval Status */}
            <FormField
              control={form.control}
              name="isApproved"
              render={({ field }) => (
                <FormItem>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" {...(field as any)} />
                    <span>Approved</span>
                  </label>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-3"
              disabled={isResponding}
            >
              {isResponding ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner width="w-4" height="w-4" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
