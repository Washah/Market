import React from "react";
import getCitiesData from "../api/citiesApi";

export function useCities() {
  const [cities, setCities] = React.useState([]);

  // get all cities names from gov api
  React.useEffect(() => {
    const fetchCitiesData = async () => {
      const data = await getCitiesData();
      setCities(data);
    };
    fetchCitiesData();
  }, []);

  return cities;
}
