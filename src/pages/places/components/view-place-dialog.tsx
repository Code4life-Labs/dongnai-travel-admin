import React from "react";

// Import components
import LoadingSpinner from "src/components/loading-spinner";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "src/components/ui/form";
import { Textarea } from "src/components/ui/textarea";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Checkbox } from "src/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

// Import hooks
import { useAuth } from "src/hooks/use-auth";
import { useViewPlaceDialogState } from "src/states/dialogs/view-place-dialog";

// Import objects
import { UserAPI } from "src/objects/user/api";

// Import state
import { usePlaceState } from "src/states/place";

// Import utils
import { Badge } from "src/components/ui/badge";

export default function ViewPlaceDialog() {
  const { isOpen, close } = useViewPlaceDialogState();
  const { currentPlace, placeTypes, isResponding, setCurrentPlace } =
    usePlaceState();
  const { user } = useAuth();

  React.useEffect(() => {
    if (currentPlace) {
      // Get description for place
      UserAPI.getPlace(currentPlace._id).then((result) => {
        currentPlace.description = result?.data.description;
        setCurrentPlace(currentPlace);
      });
    }
  }, [currentPlace, isOpen]);

  return (
    <Dialog open={isOpen} modal defaultOpen={isOpen} onOpenChange={close}>
      <DialogContent className="min-w-[720px] border-b border-b-2 pb-3 mb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place Details</DialogTitle>
        </DialogHeader>
        {/* Name */}
        <div>
          <label className="font-medium">Place Name</label>
          <Input
            value={currentPlace ? currentPlace.name : "Loading..."}
            disabled
          />
        </div>

        {/* Place ID */}
        <div>
          <label className="font-medium">Google Place ID</label>
          <Input
            value={currentPlace ? currentPlace.placeId : "Loading..."}
            disabled
          />
        </div>

        {/* URL */}
        <div>
          <label className="font-medium">Google Maps URL</label>
          <Input
            value={currentPlace ? currentPlace.url : "Loading..."}
            disabled
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <Textarea
            value={currentPlace ? currentPlace.description : "Loading..."}
            disabled
            className="min-h-[120px]"
          />
        </div>

        <div className="border p-3 rounded-md">
          <label className="font-medium">User Interactions</label>
          <div className="flex justify-center gap-3 mx-auto">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <p>Total Favorites</p>
                <p className="font-bold text-xl">
                  {currentPlace ? currentPlace.totalFavorites : 0}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p>Total Visits</p>
                <p className="font-bold text-xl">
                  {currentPlace ? currentPlace.totalVisits : 0}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <p>Total Reviews</p>
                <p className="font-bold text-xl">
                  {currentPlace ? currentPlace.totalReviews : 0}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p>Rating</p>
                <p className="font-bold text-xl">
                  {currentPlace ? currentPlace.rating : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="font-medium">Photos</label>
          <div className="flex gap-2 overflow-x-auto">
            {currentPlace && currentPlace.photos.length > 0 ? (
              currentPlace.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
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

        {/* Location */}
        <div className="border p-3 rounded-md">
          <h3 className="text-md font-medium mb-2">Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Latitude</label>
              <Input
                value={
                  currentPlace
                    ? currentPlace.geometry.location.lat
                    : "Loading..."
                }
                disabled
              />
            </div>
            <div>
              <label className="font-medium">Longitude</label>
              <Input
                value={
                  currentPlace
                    ? currentPlace.geometry.location.lng
                    : "Loading..."
                }
                disabled
              />
            </div>
          </div>
        </div>

        {/* Address Components */}
        <div className="border p-3 rounded-md">
          <h3 className="text-md font-medium mb-2">Address Components</h3>
          {currentPlace ? (
            currentPlace.addressComponents.map((component, index) => (
              <div key={index} className="border-b py-2 last:border-none">
                <p className="font-medium">{component.longName}</p>
                <p className="text-sm text-gray-500">{component.shortName}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {component.types.map((type, i) => (
                    <Badge key={i} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* Types */}
        <div>
          <label className="font-medium">Types of Place</label>
          <div className="flex flex-wrap gap-2">
            {currentPlace ? (
              currentPlace.types.map((type, index) => (
                <Badge key={index} variant="outline">
                  {type.name}
                </Badge>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        {/* Recommended */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={currentPlace ? currentPlace.isRecommended : false}
            disabled
          />
          <label className="font-medium">Recommended</label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
