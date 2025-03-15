import { create } from "zustand";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { PlaceType } from "src/objects/place/types";
import type { VNRecordType } from "src/types/general";

type PlaceState = {
  currentPlace: PlaceType | null;
  places: Array<PlaceType> | null;
  placeTypes: Array<VNRecordType> | null;
  isResponding: boolean;
};

type PlaceActions = {
  // For place
  setCurrentPlace(place: PlaceType | null): void;
  setPlaces(places: Array<PlaceType> | null): void;
  setPlaceTypes(placeTypes: Array<VNRecordType> | null): void;
  addPlaces(places: Array<PlaceType> | null): void;
  addPlace(place: PlaceType): void;
  updatePlace(place: PlaceType): void;
  detetePlace(place: PlaceType): void;
  updateIsResponding(status?: boolean): void;
  clearPlaces(): void;
};

/**
 * Use this function to delete a place from a list.
 * @param list
 * @param place
 */
function deletePlaceFromList(
  list: Array<PlaceType>,
  place: PlaceType | string
) {
  let placeId;

  if (typeof place === "string") {
    placeId = place;
  } else {
    placeId = place._id;
  }

  // Find index
  const placeIndex = list.findIndex((place) => place._id === placeId);

  // Delete
  list.splice(placeIndex, 1);

  return list;
}

const initialState = {
  currentPlace: null,
  places: null,
  placeTypes: null,
  isResponding: false,
};

export const usePlaceState = create<PlaceState & PlaceActions>((set) => {
  return {
    ...initialState,
    updateIsResponding(status?: boolean) {
      set((state) => ({ ...state, isResponding: Boolean(status) }));
    },

    setCurrentPlace(place) {
      set((state) => {
        return { ...state, currentPlace: place };
      });
    },

    setPlaces(places) {
      set((state) => {
        return { ...state, places: places };
      });
    },

    setPlaceTypes(placeTypes) {
      set((state) => {
        return { ...state, placeTypes };
      });
    },

    addPlaces(places) {
      set((state) => {
        if (!places) return state;

        // Add places to global places
        if (state.places) state.places = state.places.concat(places);

        return {
          ...state,
          places: state.places,
        };
      });
    },

    addPlace(place: PlaceType) {
      set((state) => {
        if (!state.places) state.places = [];

        // Push to global places
        state.places.push(place);

        return { ...state, places: state.places };
      });
    },

    updatePlace(place: PlaceType) {
      set((state) => {
        if (!state.places) return state;
        if (!place) return state;

        const oldPlaceIndex = state.places.findIndex(
          (t) => t._id === place._id
        );
        OtherUtils.replaceAt(state.places, oldPlaceIndex, place);

        return {
          ...state,
          places: state.places,
        };
      });
    },

    detetePlace(place: PlaceType) {
      set((state) => {
        if (!state.places) return state;

        // Delete from global store
        deletePlaceFromList(state.places, place);

        return {
          ...state,
          places: state.places,
        };
      });
    },

    clearPlaces() {
      set((state) => {
        return {
          ...state,
          ...initialState,
        };
      });
    },
  };
});
