export const lookupsService = () => {
  return {
    async getLookup(endpoint) {
      const { data, error } = await useMyFetch(`member/lookups/${endpoint}`);

      // if (useErrorHandler(error.value)) return;

      return data?.value?.data;
    },
  };
};
