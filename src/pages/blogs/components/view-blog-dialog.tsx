import React from "react";

// Import components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Badge } from "src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";

// Import components
import MDContent from "src/components/markdown";

// Import hooks
import { useAuth } from "src/hooks/use-auth";
import { useViewBlogDialogState } from "src/states/dialogs/view-blog-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import state
import { useBlogState } from "src/states/blog";

// Import utils
import { DatetimeUtils } from "src/utils/datetime";

export default function ViewBlogDialog() {
  const { isOpen, close } = useViewBlogDialogState();
  const { currentBlog, blogTypes, isResponding, setCurrentBlog } =
    useBlogState();
  const { user } = useAuth();

  React.useEffect(() => {
    if (currentBlog) {
      // Get content for blog
      UserAPI.getBlog(currentBlog._id).then((result) => {
        currentBlog.content = result?.data.content;
        currentBlog.images = result?.data.images;
        currentBlog.mentionedPlaces = result?.data.mentionedPlaces!;
        setCurrentBlog(currentBlog);
      });
    }
  }, [currentBlog, isOpen]);

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen} onOpenChange={close}>
      <DialogContent className="block min-w-[720px] pb-3 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blog Details</DialogTitle>
        </DialogHeader>

        {/* Cover Image */}
        {currentBlog ? (
          <div className="flex justify-center mb-3">
            <img
              src={currentBlog.coverImage}
              alt="Cover"
              className="max-w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
              }}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {/* Blog Title */}
        <div className="mb-3">
          <h2 className="text-xl font-semibold max-w-full">
            {currentBlog ? currentBlog.name : "Loading..."}
          </h2>
        </div>

        {/* Read Time & Status */}
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {currentBlog ? DatetimeUtils.toMinute(currentBlog.readTime) : 0} min
            read
          </Badge>
          <Badge
            variant={
              currentBlog && currentBlog.isApproved ? "default" : "destructive"
            }
          >
            {currentBlog && currentBlog.isApproved ? "Approved" : "Pending"}
          </Badge>
        </div>

        <hr className="my-3" />

        {/* Author */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentBlog ? currentBlog.author.avatar : ""} />
              <AvatarFallback>
                {currentBlog
                  ? currentBlog.author.firstName?.charAt(0)
                  : "Loading..."}
                {currentBlog
                  ? currentBlog.author.lastName?.charAt(0)
                  : "Loading..."}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {currentBlog ? currentBlog.author.firstName : ""}{" "}
                {currentBlog ? currentBlog.author.lastName : ""}
              </p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          {/* Blog Statistics */}
          <div>
            <div className="text-sm text-gray-500">
              <p>
                💬{" "}
                {currentBlog && currentBlog.totalComments
                  ? currentBlog.totalComments
                  : 0}{" "}
                Comments
              </p>
              <p>
                ❤️{" "}
                {currentBlog && currentBlog.totalFavorites
                  ? currentBlog.totalFavorites
                  : 0}{" "}
                Favorites
              </p>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        {/* Content */}
        <div className="max-w-full">
          <MDContent>
            {currentBlog ? currentBlog.content : "Loading..."}
          </MDContent>
        </div>

        {/* Additional Images */}
        <div className="mb-3">
          <h3 className="text-lg font-medium">Gallery</h3>
          <div className="flex gap-2 overflow-x-auto">
            {currentBlog &&
            currentBlog.images &&
            currentBlog.images.length > 0 ? (
              currentBlog.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.jpg";
                  }}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        {/* Mentioned Places */}
        <div>
          <h3 className="text-lg font-medium">Mentioned Places</h3>
          <div className="grid grid-cols-2 gap-4">
            {currentBlog &&
            currentBlog.mentionedPlaces &&
            currentBlog.mentionedPlaces.length ? (
              currentBlog.mentionedPlaces.map((place, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-md flex items-center gap-3"
                >
                  <img
                    src={place.photos?.[0] || "/placeholder-image.jpg"}
                    alt={place.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <p className="font-medium">{place.name}</p>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
