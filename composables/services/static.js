export const staticService = () => {
  return {
    async getPrivacy() {
      const { data, error } = await useMyFetch("member/general/privacy");

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async getTerms() {
      const { data, error } = await useMyFetch("member/general/term");

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },

    async getFaqs() {
      const { data, error } = await useMyFetch("member/general/faq");

      if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },
  };
};
