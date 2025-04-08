import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { X, Upload } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Checkbox } from "src/components/ui/checkbox";
import { DatePicker, DatePickerForm } from "src/components/date-picker";
import LoadingSpinner from "src/components/loading-spinner";

// Import objects
import { BannerAPI } from "src/objects/banner/api";
import { BannerUtils } from "src/objects/banner/utils";

// import states
import { useBannerDialogState } from "src/states/dialogs/banner-dialog";
import { useBannerState } from "src/states/banner";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { BannerFormType } from "src/objects/banner/types";

export default function BannerFormDialog() {
  const { isOpen, close } = useBannerDialogState();
  const {
    currentBanner,
    addBanner,
    updateBanner,
    isResponding,
    updateIsResponding,
    setCurrentBanner,
  } = useBannerState();

  const [uploadPreview, setUploadPreview] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const form = useForm<BannerFormType>({
    defaultValues: currentBanner || {
      title: "",
      image: "",
      target: "",
      brand: {
        name: "",
        logoUrl: "",
        website: "",
      },
      isActive: true,
      startDate: Date.now(),
      endDate: Date.now(),
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      form.setValue("newImage", file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<BannerFormType> = async (data) => {
    updateIsResponding(true);
    try {
      if (currentBanner) {
        // Update banner
        (data as any)._id = currentBanner._id;
        const result = await BannerAPI.updateBanner(
          currentBanner._id,
          BannerUtils.toFormData(data as any)
        );
        if (result?.success) {
          close();
          updateBanner(data as any);
        }
      } else {
        // Create new banner
        const result = await BannerAPI.createBanner(
          BannerUtils.toFormData(data as any)
        );
        if (result?.success) {
          close();
          addBanner(result.data);
        }
      }
    } finally {
      updateIsResponding(false);
    }
  };

  React.useEffect(() => {
    console.log("Current:", currentBanner);
    if (currentBanner) {
      form.reset(currentBanner);
      setUploadPreview(currentBanner.image);
    } else {
      form.reset({
        title: "",
        image: "",
        target: "",
        brand: {
          name: "",
          logoUrl: "",
          website: "",
        },
        isActive: true,
        startDate: Date.now(),
        endDate: Date.now(),
      });
    }
  }, [currentBanner]);

  React.useEffect(() => {
    return function () {
      setCurrentBanner(null);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="min-w-[720px] max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentBanner ? "Edit Banner" : "Create Banner"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter banner title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel>Image</FormLabel>
            {uploadPreview && (
              <div className="w-full aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={uploadPreview}
                  alt="Preview"
                  className="w-full aspect-video object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg")
                  }
                />
              </div>
            )}
            <Input
              name="newImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter target link..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Fields */}
            <FormField
              control={form.control}
              name="brand.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand.logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand logo URL..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand website URL..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Checkbox
                      style={{ marginTop: 0 }}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <DatePickerForm
              label="Start Date"
              name="startDate"
              form={form as any}
              TriggerContent={({ fieldValue }) => (
                <Button type="button" variant="outline">
                  {DatetimeUtils.getShortDateStr(fieldValue)}
                </Button>
              )}
            />

            {/* End Date */}
            <DatePickerForm
              label="End Date"
              name="endDate"
              form={form as any}
              TriggerContent={({ fieldValue }) => (
                <Button type="button" variant="outline">
                  {DatetimeUtils.getShortDateStr(fieldValue)}
                </Button>
              )}
            />

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" type="button" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" disabled={isResponding}>
                {isResponding ? (
                  <LoadingSpinner />
                ) : currentBanner ? (
                  "Edit"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
