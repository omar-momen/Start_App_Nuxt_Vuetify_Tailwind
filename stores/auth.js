export const useAuthStore = defineStore("auth", () => {
  const nuxtApp = useNuxtApp();

  const is_first_visit = ref(false);

  const verify_code = ref(null);
  const verify_phone_value = ref(null);

  // ======== Handle First Load
  const redirect_token = useCookie("redirect_token");
  const handleFirstLoad = async () => {
    const user = nuxtApp.$encryptStorage.getItem("blank_App_User");
    if (!user) return;
    redirect_token.value = user?.token;
  };

  // ======== Storage
  const user = ref(null);
  const setStorage = (userData) => {
    user.value = userData;
    nuxtApp.$encryptStorage.setItem("blank_App_User", userData);
    is_first_visit.value = userData.is_first_visit;
    redirect_token.value = userData.token;
  };
  const clearStorage = () => {
    user.value = null;
    redirect_token.value = null;
    nuxtApp.$encryptStorage.removeItem("blank_App_User");
  };

  // ======== Verify Phone
  const verifyPhoneNumber = async (
    phone,
    forgetPass = false,
    resend = false,
  ) => {
    const data = await authService().verifyPhoneNumber(
      phone,
      forgetPass,
      resend,
    );
    verify_phone_value.value = phone;
    return data;
  };
  const confirmPhoneNumber = async (code, forgetPass = false) => {
    const data = await authService().confirmPhoneNumber(
      verify_phone_value.value,
      code,
      forgetPass,
    );
    verify_code.value = code;
    return data;
  };

  // ======== Main Actions
  const logIn = async (loginData) => {
    const user = await authService().login(loginData);
    if (user) {
      setStorage(user);
    }
    return user;
  };
  const forgetPassword = async (phone) => {
    const data = await authService().forgetPassword(phone);
    verify_phone_value.value = phone;
    return data;
  };
  const resetPassowrd = async (new_password) => {
    const data = await authService().resetPassowrd(
      verify_phone_value.value,
      verify_code.value,
      new_password,
    );

    if (data) {
      // reset values
      verify_phone_value.value = null;
      verify_code.value = null;
    }

    return data;
  };

  const logOut = async () => {
    const data = await authService().logout();
    if (data) {
      clearStorage();
      return navigateTo("/authentication/login");
    }
  };

  const signup = async (signupData) => {
    const body = {
      ...signupData,
    };
    const user = await authService().signup(body);
    if (user) {
      // reset values
      verify_phone_value.value = null;
      verify_code.value = null;
    }
    return user;
  };

  return {
    verifyPhoneNumber,
    confirmPhoneNumber,

    logIn,
    forgetPassword,
    resetPassowrd,
    logOut,
    clearStorage,
    signup,

    user,
    is_first_visit,
    verify_phone_value,
    verify_code,

    handleFirstLoad,

    clearStorage,
    setStorage,
  };
});
