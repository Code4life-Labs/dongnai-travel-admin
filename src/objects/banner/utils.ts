// Import types
import type { BannerFormType } from "./types";

export class BannerUtils {
  static Constants = {
    MinActivatedDay: 5,
    MaxActivatedDay: 20,
  };

  static toFormData(banner: BannerFormType): FormData {
    const formData = new FormData();

    if (banner._id) formData.append("_id", banner._id);
    formData.append("title", banner.title || "");
    formData.append("target", banner.target || "");
    formData.append("brand[name]", banner.brand.name || "");
    formData.append("brand[logoUrl]", banner.brand.logoUrl || "");
    formData.append("brand[website]", banner.brand.website || "");
    formData.append("isActive", String(banner.isActive || false));
    formData.append("startDate", String(banner.startDate || Date.now()));
    formData.append(
      "endDate",
      String(
        banner.startDate ||
          Date.now() +
            BannerUtils.Constants.MinActivatedDay * 24 * 60 * 60 * 1000
      )
    );

    if (banner.deleteImage) {
      formData.append("deleteImage", banner.deleteImage);
    }

    if (banner.newImage) {
      formData.append("newImage", banner.newImage);
    }

    return formData;
  }
}
