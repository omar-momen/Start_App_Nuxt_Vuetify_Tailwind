export const useSuccessToas = (message) => {
  const nuxtApp = useNuxtApp();
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

  Toast.fire({
    icon: "success",
    title: useHelpers().capitalizeEveryWord(message),
  });
};
