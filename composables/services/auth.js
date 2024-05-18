import { useLangStore } from "~/stores/lang";

export const authService = () => {
  const langStore = useLangStore();

  return {
    async login(loginData) {
      const { data, error } = await useMyFetch("member/auth/login", {
        method: "POST",
        body: loginData,
      });

      if (useErrorHandler(error.value, "login")) return;

      const message =
        langStore.current_lang == "en"
          ? "Welcome to Samh RealState"
          : "مرحبا بك في سمح العقارية";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async logout() {
      const { data, error } = await useMyFetch("member/auth/logout", {
        method: "POST",
      });

      if (!error.value) {
        const message =
          langStore.current_lang == "en"
            ? "You have been logged out successfully"
            : "تم تسجيل الخروج بنجاح";
        useSuccessToas(message);
      }

      return data?.value?.data;
    },

    async verifyPhoneNumber(phone_number, forgetPass, resend) {
      const { data, error } = await useMyFetch(
        forgetPass
          ? `member/auth/forget-password${resend ? "?resend=true" : ""}`
          : `member/auth/send-sms-code${resend ? "?resend=true" : ""}`,
        {
          method: "POST",
          body: { phone_number },
        },
      );

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Verification code sent successfully"
          : "تم ارسال كود التحقق بنجاح";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async confirmPhoneNumber(phone_number, otp_code, forgetPass) {
      const { data, error } = await useMyFetch(
        forgetPass
          ? `member/auth/verify-forget-password`
          : `member/auth/verify-sms-code`,
        {
          method: "POST",
          body: { phone_number, otp_code },
        },
      );

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "code verified successfully"
          : "تم التأكيد من الكود بنجاح";
      useSuccessToas(message);

      return data?.value?.data;
    },

    async resetPassowrd(phone_number, otp_code, new_password) {
      const { data, error } = await useMyFetch(`member/auth/reset-password`, {
        method: "POST",
        body: { phone_number, otp_code, new_password },
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "password reset successfully"
          : "تمت إعادة تعيين كلمة المرور بنجاح";
      useSuccessToas(message);

      return data;
    },

    async signup(signupData) {
      const { data, error } = await useMyFetch("member/auth/register", {
        method: "POST",
        body: signupData,
      });

      if (useErrorHandler(error.value)) return;

      const message =
        langStore.current_lang == "en"
          ? "Account created successfully, please login"
          : "تم انشاء الحساب بنجاح برجاء تسجيل الدخول";
      useSuccessToas(message);

      return data?.value?.data;
    },
  };
};
