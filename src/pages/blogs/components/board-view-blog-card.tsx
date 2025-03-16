import React from "react";
import { Ellipsis, Trash2, Clock, Heart } from "lucide-react";

// Import components
import BlogFormDialog from "../../places/components/place-form-dialog";
import { BlogStatusBadge } from "./blog-attribute-badges";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "src/components/ui/dropdown-menu";

// Import hooks
import { useBlogState } from "src/states/blog";

// Import states
import { useViewBlogDialogState } from "src/states/dialogs/view-blog-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

// Import types
import type { BlogType } from "src/objects/blog/types";

type BlogCardProps = {
  data: BlogType;
};

export default function BoardViewBlogCard({ data }: BlogCardProps) {
  const { open } = useViewBlogDialogState();
  const { setCurrentBlog, deteteBlog } = useBlogState();
  const draggableCardRef = React.useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (draggableCardRef.current) {
      e.dataTransfer.setData("taskId", data._id);
    }
  };

  return (
    <div
      ref={draggableCardRef}
      draggable
      onDragStart={handleDragStart}
      className="relative flex cursor-grab bg-white shadow w-full justify-between px-3 py-2 rounded-lg border mb-3"
    >
      {/* Cover Image */}
      {data.coverImage && (
        <img
          src={data.coverImage}
          alt={data.name}
          className="w-24 h-24 object-cover rounded-lg mr-3"
        />
      )}

      {/* Blog Info */}
      <section className="flex-1">
        <header
          onClick={() => {
            open();
            setCurrentBlog(data);
          }}
          className="text-left cursor-pointer hover:underline"
        >
          <h3 className="font-bold">{data.name}</h3>
        </header>

        {/* Meta Info */}
        <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{DatetimeUtils.toMinute(data.readTime)} min to read</span>
          <span className="mx-2">|</span>
          <span className="text-primary">{data.type.name}</span>
        </div>

        {/* Author Details */}
        <div className="mt-2 flex items-center gap-2">
          {data.author.avatar ? (
            <img
              src={data.author.avatar}
              alt={data.author.displayName}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          )}
          <span className="text-sm font-medium">{data.author.displayName}</span>
        </div>

        {/* Blog Status */}
        <div className="mt-2 flex items-center gap-2">
          <BlogStatusBadge data={data.isApproved} />
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm">{data.totalFavorites}</span>
        </div>
      </section>

      {/* Dropdown Menu */}
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Ellipsis className="cursor-pointer hover:bg-secondary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                UserAPI.deleteBlog(data._id).then(() => {
                  deteteBlog(data);
                });
              }}
              className="flex items-center cursor-pointer"
            >
              <Trash2 className="text-destructive" />
              <p className="text-destructive">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
