// Import types
import type { PlaceType } from "src/objects/place/types";

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

  static toFormData(place: PlaceType) {
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
}
