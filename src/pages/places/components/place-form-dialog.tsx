import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MapPin, X, Upload } from "lucide-react";

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

// Import hooks
import { useAuth } from "src/hooks/use-auth";
import { UserAPI } from "src/objects/user/api";

// Import state
import { usePlaceState } from "src/states/place";

// Import utils
import { PlaceUtils } from "src/objects/place/utils";

type AddressComponent = {
  longName: string;
  shortName: string;
  types: string[];
};

type Viewport = {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
};

type PlaceFormValues = {
  name: string;
  url: string;
  placeId: string;
  isRecommended: boolean;
  content: string;
  photos: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: Viewport;
  };
  addressComponents: AddressComponent[];
  typeIds: string[];
};

type PlaceFormDialogProps = {
  TriggerContent: (() => JSX.Element) | JSX.Element;
};

export default function PlaceFormDialog({
  TriggerContent,
}: PlaceFormDialogProps) {
  const {
    currentPlace,
    isResponding,
    addPlace,
    updatePlace,
    updateIsResponding,
  } = usePlaceState();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const form = useForm<PlaceFormValues>({
    defaultValues: currentPlace
      ? PlaceUtils.toModel(currentPlace)
      : {
          name: "",
          url: "",
          placeId: "",
          isRecommended: false,
          photos: [],
          geometry: {
            location: {
              lat: 0,
              lng: 0,
            },
            viewport: {
              northeast: {
                lat: 0,
                lng: 0,
              },
              southwest: {
                lat: 0,
                lng: 0,
              },
            },
          },
          addressComponents: [],
          typeIds: [],
        },
  });

  const onSubmit: SubmitHandler<PlaceFormValues> = async (data) => {
    if (!user) return;
    updateIsResponding(true);

    try {
      let response;
      if (currentPlace) {
        response = await UserAPI.updatePlace(currentPlace._id, data);
        if (response) updatePlace(response.data);
      } else {
        response = await UserAPI.createPlace(data as any);
        if (response) addPlace(response.data);
      }
      setIsOpen(false);
    } finally {
      updateIsResponding(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    setUploadingImage(true);

    try {
      const file = event.target.files[0];
      // Assuming you have an upload function in your API
      const response = await (UserAPI as any).uploadImage(file);

      if (response && response.data && response.data.url) {
        // Get current photos array
        const currentPhotos = form.getValues("photos") || [];
        // Add new photo URL to the array
        form.setValue("photos", [...currentPhotos, response.data.url]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // You might want to show an error notification here
    } finally {
      setUploadingImage(false);
      // Reset the input
      if (event.target) event.target.value = "";
    }
  };

  const removePhoto = (index: number) => {
    const currentPhotos = [...form.getValues("photos")];
    currentPhotos.splice(index, 1);
    form.setValue("photos", currentPhotos);
  };

  React.useEffect(() => {
    if (currentPlace) form.reset(PlaceUtils.toModel(currentPlace));
  }, [currentPlace, isOpen]);

  // Get photos from form
  const photos = form.watch("photos") || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {typeof TriggerContent === "function" ? (
          <TriggerContent />
        ) : (
          TriggerContent
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[720px] border-b border-b-2 pb-3 mb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {currentPlace ? "Edit Place" : "Create Place"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Place Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter place name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Place ID */}
            <FormField
              control={form.control}
              name="placeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Place ID</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. ChIJPUHe5ahndDEROMOu9CU11CE"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://maps.google.com/?cid=..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photos */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Photos</FormLabel>

                  {/* Image Preview */}
                  {photos.length > 0 && (
                    <div className="space-y-3">
                      <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={photos[0]}
                          alt="Place preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder-image.jpg";
                          }}
                        />
                      </div>

                      {/* Photo List */}
                      <div className="flex flex-wrap gap-2">
                        {photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden"
                          >
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder-image.jpg";
                              }}
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md"
                              onClick={() => removePhoto(index)}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Text Input for URLs */}
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Comma-separated photo URLs"
                      value={field.value?.join(",")}
                      onChange={(e) => {
                        const photoUrls = e.target.value
                          ? e.target.value.split(",")
                          : [];
                        field.onChange(photoUrls);
                      }}
                    />
                  </FormControl>

                  {/* File Upload */}
                  <div className="mt-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-gray-50">
                        <Upload size={18} />
                        <span>
                          {uploadingImage ? "Uploading..." : "Upload New Image"}
                        </span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Section */}
            <div className="border p-3 rounded-md">
              <h3 className="text-md font-medium mb-3">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latitude */}
                <FormField
                  control={form.control}
                  name="geometry.location.lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g. 11.2309993"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Longitude */}
                <FormField
                  control={form.control}
                  name="geometry.location.lng"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g. 107.4401813"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Type IDs */}
            <FormField
              control={form.control}
              name="typeIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type IDs</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Comma-separated type IDs (e.g. id-1,id-02)"
                      value={field.value?.join(",")}
                      onChange={(e) => {
                        const typeIds = e.target.value
                          ? e.target.value.split(",")
                          : [];
                        field.onChange(typeIds);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Recommended */}
            <FormField
              control={form.control}
              name="isRecommended"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Recommended</FormLabel>
                    <p className="text-sm text-gray-500">
                      Should this place be recommended to users?
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-3"
              disabled={isResponding || uploadingImage}
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
