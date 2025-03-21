import { create } from "zustand";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { BannerType } from "src/objects/banner/types";
import type { VNRecordType } from "src/types/general";

type BannerState = {
  currentBanner: BannerType | null;
  banners: Array<BannerType> | null;
  isResponding: boolean;
};

type BannerActions = {
  // For banner
  setCurrentBanner(banner: BannerType | null): void;
  setBanners(banners: Array<BannerType> | null): void;
  setBannerTypes(bannerTypes: Array<VNRecordType> | null): void;
  addBanners(banners: Array<BannerType> | null): void;
  addBanner(banner: BannerType): void;
  updateBanner(banner: BannerType): void;
  deteteBanner(banner: BannerType): void;
  updateIsResponding(status?: boolean): void;
  clearBanners(): void;
};

/**
 * Use this function to delete a banner from a list.
 * @param list
 * @param banner
 */
function deleteBannerFromList(
  list: Array<BannerType>,
  banner: BannerType | string
) {
  let bannerId;

  if (typeof banner === "string") {
    bannerId = banner;
  } else {
    bannerId = banner._id;
  }

  // Find index
  const bannerIndex = list.findIndex((banner) => banner._id === bannerId);

  // Delete
  list.splice(bannerIndex, 1);

  return list;
}

const initialState = {
  currentBanner: null,
  banners: null,
  isResponding: false,
};

export const useBannerState = create<BannerState & BannerActions>((set) => {
  return {
    ...initialState,
    updateIsResponding(status?: boolean) {
      set((state) => ({ ...state, isResponding: Boolean(status) }));
    },

    setCurrentBanner(banner) {
      set((state) => {
        return { ...state, currentBanner: banner };
      });
    },

    setBanners(banners) {
      set((state) => {
        return { ...state, banners: banners };
      });
    },

    setBannerTypes(bannerTypes) {
      set((state) => {
        return { ...state, bannerTypes };
      });
    },

    addBanners(banners) {
      set((state) => {
        if (!banners) return state;

        // Add banners to global banners
        if (state.banners) state.banners = state.banners.concat(banners);

        return {
          ...state,
          banners: state.banners,
        };
      });
    },

    addBanner(banner: BannerType) {
      set((state) => {
        if (!state.banners) state.banners = [];

        // Push to global banners
        state.banners.push(banner);

        return { ...state, banners: state.banners };
      });
    },

    updateBanner(banner: BannerType) {
      set((state) => {
        if (!state.banners) return state;
        if (!banner) return state;

        const oldBannerIndex = state.banners.findIndex(
          (t) => t._id === banner._id
        );
        OtherUtils.replaceAt(state.banners, oldBannerIndex, banner);

        return {
          ...state,
          banners: state.banners,
        };
      });
    },

    deteteBanner(banner: BannerType) {
      set((state) => {
        if (!state.banners) return state;

        // Delete from global store
        deleteBannerFromList(state.banners, banner);

        return {
          ...state,
          banners: state.banners,
        };
      });
    },

    clearBanners() {
      set((state) => {
        return {
          ...state,
          ...initialState,
        };
      });
    },
  };
});
