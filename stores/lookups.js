export const useLookupsStore = defineStore("lookups", () => {
  const regions = ref(null);
  const getRegions = async () => {
    const data = await lookupsService().getLookup("regions");
    if (data) {
      regions.value = data;
    }
    return data;
  };

  const cities = ref(null);
  const getCities = async (region_id) => {
    const data = await lookupsService().getLookup(
      `cities?region_id=${region_id}`,
    );
    if (data) {
      cities.value = data;
    }
    return data;
  };

  const districts = ref(null);
  const getDistricts = async (city_id) => {
    const data = await lookupsService().getLookup(
      `districts?city_id=${city_id}`,
    );
    if (data) {
      districts.value = data;
    }
    return data;
  };

  return {
    getRegions,
    regions,

    getCities,
    cities,

    getDistricts,
    districts,
  };
});
