export const useTableApi = () => {
  return {
    async getTable(url, page, params) {
      const { data: response_data, error } = await useMyFetch(
        url +
          `?page=${page}&per_page=10&keyword=${
            params?.keyword || ""
          }&updated_at=${params?.updated_at || ""}&status=${
            params?.status?.value || ""
          }`
      );

      if (useErrorHandler(error.value)) return;

      return response_data?.value;
    },

    async deleteRow(url) {
      const { data: response_data, error } = await useMyFetch(url, {
        method: "DELETE",
      });

      if (useErrorHandler(error.value)) return;

      return response_data?.value?.data;
    },
  };
};
