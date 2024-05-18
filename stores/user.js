import { useAuthStore } from "@/stores/auth";

export const useUserStore = defineStore("user", () => {
  const auth_store = useAuthStore();

  const profileData = ref(null);
  const getProfile = async () => {
    const profileData = await userService().getProfile();

    return profileData;
  };

  const editProfile = async (type, profileData) => {
    return await userService().editProfile(type, profileData);
  };

  const permissions = ref([]);
  const getUserPermissions = async () => {
    if (!auth_store.user) return;
    const data = await userService().getUserPermissions();
    if (data) {
      permissions.value = data;
    }
    return data;
  };

  return {
    getProfile,
    profileData,
    editProfile,

    permissions,
    getUserPermissions,
  };
});
