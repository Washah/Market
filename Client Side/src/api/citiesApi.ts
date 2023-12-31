import axios from "axios";

// api request to get all israel cities
const getCitiesData = async () => {
  try {
    const response = await axios.get(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&q=&limit=9999"
    );
    const data = response.data.result.records;
    const cityNames = data
      .map((city: { שם_ישוב_לועזי: string }) => city.שם_ישוב_לועזי)
      .filter((cityName: string) => cityName !== " ");
    return cityNames;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCitiesData;
