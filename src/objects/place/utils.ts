// Import types
import type { PlaceType, PlaceFormType } from "src/objects/place/types";

export class PlaceUtils {
  /**
   * Get place by its `id`
   * @param places
   * @param id
   * @returns
   */
  static getPlaceById(places: Array<PlaceType> | null, id: string) {
    if (!places) return null;
    return places.find((place) => place._id === id);
  }

  /**
   * Get attribute in attributes list of place by `name`
   * @param attributes
   * @param name
   * @returns
   */
  static getPlaceAttributeByName(attributes: Array<any> | null, name: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.name === name);
  }

  /**
   * Get attribute in attributes list of place by `id`
   * @param attributes
   * @param name
   * @returns
   */
  static getPlaceAttributeById(attributes: Array<any> | null, id: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute._id === id);
  }

  /**
   * Get attribute in attributes list of place by `value`
   * @param attributes
   * @param name
   * @returns
   */
  static getPlaceAttributeByValue(
    attributes: Array<any> | null,
    value: string
  ) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.value === value);
  }

  /**
   * Get color by status
   * @param status
   * @returns
   */
  static getStatusColor(status: boolean) {
    let result = "";
    let value = status === true ? "yes" : "no";

    switch (value) {
      case "no": {
        result = `border-red-700 bg-red-100`;
        break;
      }

      case "yes": {
        result = `border-green-700 bg-green-100`;
        break;
      }
    }

    return result;
  }

  static toModel(place: PlaceType) {
    return {
      _id: place._id || "",
      name: place.name || "",
      url: place.url || "",
      placeId: place.placeId || "",
      isRecommended: place.isRecommended || false,
      content: place.content || "",
      photos: place.photos || [],
      geometry: {
        location: {
          lat: place.geometry?.location?.lat || 0,
          lng: place.geometry?.location?.lng || 0,
        },
        viewport: {
          northeast: {
            lat: place.geometry?.viewport?.northeast?.lat || 0,
            lng: place.geometry?.viewport?.northeast?.lng || 0,
          },
          southwest: {
            lat: place.geometry?.viewport?.southwest?.lat || 0,
            lng: place.geometry?.viewport?.southwest?.lng || 0,
          },
        },
      },
      addressComponents: place.addressComponents || [],
      typeIds: place.types.map((type) => type._id) || [],
    };
  }

  static toPreFormData(place: PlaceType) {
    return {
      name: place.name || "",
      url: place.url || "",
      placeId: place.placeId || "",
      isRecommended: place.isRecommended || false,
      content: place.content || "",
      photos: place.photos || [],
      geometry: {
        location: {
          lat: place.geometry?.location?.lat || 0,
          lng: place.geometry?.location?.lng || 0,
        },
        viewport: {
          northeast: {
            lat: place.geometry?.viewport?.northeast?.lat || 0,
            lng: place.geometry?.viewport?.northeast?.lng || 0,
          },
          southwest: {
            lat: place.geometry?.viewport?.southwest?.lat || 0,
            lng: place.geometry?.viewport?.southwest?.lng || 0,
          },
        },
      },
      addressComponents: place.addressComponents || [],
      types: place.types || [],
    };
  }

  static toFormData(place: PlaceFormType): FormData {
    const formData = new FormData();

    formData.append("_id", place._id || "");
    formData.append("name", place.name || "");
    formData.append("url", place.url || "");
    formData.append("placeId", place.placeId || "");
    formData.append("isRecommended", String(place.isRecommended || false));
    formData.append("content", place.content || "");

    // Append photos as separate entries (assuming they are file objects or URLs)
    if (place.photos && place.photos.length > 0) {
      place.photos.forEach((photo) => {
        formData.append(`photos`, photo);
      });
    }

    if (place.deletePhotos && place.deletePhotos.length > 0) {
      place.deletePhotos.forEach((photo) => {
        formData.append(`deletePhotos`, photo);
      });
    }

    if (place.newPhotos && place.newPhotos.length > 0) {
      place.newPhotos.forEach((photo) => {
        formData.append(`newPhotos`, photo);
      });
    }

    // Append geometry fields
    if (place.geometry) {
      formData.append(
        "geometry[location][lat]",
        String(place.geometry.location?.lat || 0)
      );
      formData.append(
        "geometry[location][lng]",
        String(place.geometry.location?.lng || 0)
      );

      formData.append(
        "geometry[viewport][northeast][lat]",
        String(place.geometry.viewport?.northeast?.lat || 0)
      );
      formData.append(
        "geometry[viewport][northeast][lng]",
        String(place.geometry.viewport?.northeast?.lng || 0)
      );

      formData.append(
        "geometry[viewport][southwest][lat]",
        String(place.geometry.viewport?.southwest?.lat || 0)
      );
      formData.append(
        "geometry[viewport][southwest][lng]",
        String(place.geometry.viewport?.southwest?.lng || 0)
      );
    }

    // Append addressComponents as separate entries
    if (place.addressComponents && place.addressComponents.length > 0) {
      place.addressComponents.forEach((component) => {
        formData.append(`addressComponents`, JSON.stringify(component));
      });
    }

    // Append typeIds
    if (place.types && place.types.length > 0) {
      place.types.forEach((type) => {
        formData.append(`typeIds`, type._id);
      });
    }

    return formData;
  }
}
