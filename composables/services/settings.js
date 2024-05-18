export const settingsService = () => {
  return {
    async getSettings() {
      const { data, error } = await useMyFetch(`member/general/settings`);

      // if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },
  };
};
