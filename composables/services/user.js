import { useLangStore } from "~/stores/lang";

export const userService = () => {
  const langStore = useLangStore();

  return {
    async getProfile() {
      const { data, error } = await useMyFetch("member/profile", {
        method: "GET",
      });

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async uplodeProfileImage(image) {
      const { data, error } = await useMyFetch(`member/profile/upload-image`, {
        method: "POST",
        body: image,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Image uploaded successfully"
          : "تم رفع الصورة بنجاح";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async deleteProfileImage() {
      const { data, error } = await useMyFetch(`member/profile/delete-image`, {
        method: "POST",
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Image deleted successfully"
          : "تم حذف الصورة بنجاح";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async editProfile(type, profileData) {
      const { data, error } = await useMyFetch(
        `member/profile/upload-${type}`,
        {
          method: "POST",
          body: profileData,
        },
      );

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Profile updated successfully"
          : "تم تحديث البيانات بنجاح";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async getUserPermissions() {
      const { data, error } = await useMyFetch("member/auth/permissions", {
        method: "GET",
      });

      // if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },
  };
};
