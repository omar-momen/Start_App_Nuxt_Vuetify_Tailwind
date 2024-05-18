export const useErrorHandler = (error, api = null) => {
  if (process.client) {
    const nuxtApp = useNuxtApp();

    // Do nothing if the response is 401 or 403
    if (
      (error?.data?.status == 403 || error?.data?.status == 401) &&
      api !== "logout" &&
      api !== "login"
    ) {
      return 1;
    }

    const errors = error?.data?.errors;
    const errorMessage = error?.data?.message;

    if (!error) return 0;
    if (!errors && errors?.length == 0 && !errorMessage) return 0;

    const Toast = nuxtApp.$Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = nuxtApp.$Swal.stopTimer;
        toast.onmouseleave = nuxtApp.$Swal.resumeTimer;
      },
    });

    if (typeof error === "string") {
      Toast.fire({
        icon: "error",
        title: useHelpers().capitalizeEveryWord(error),
      });
      return 1;
    }

    if (Array.isArray(errors) && errors.length > 0) {
      for (const error of errors) {
        Toast.fire({
          icon: "error",
          title: error,
        });
      }
      return 1;
    } else if (errors && Object.keys(errors).length > 0) {
      for (const field in errors) {
        if (errors[field].length > 0) {
          const message = useHelpers().capitalizeEveryWord(
            `${errors[field][0]}`
          );

          Toast.fire({
            icon: "error",
            title: message,
          });
        }
      }
      return 1;
    } else {
      Toast.fire({
        icon: "error",
        title: errorMessage,
      });
      return 1;
    }
  }
};
