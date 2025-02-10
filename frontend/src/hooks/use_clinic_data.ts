import { useState, useEffect } from "react";

export function useClinicData(): { initialDate: string; endDate: string } {
  const [initialDate, setInitialDate] = useState("2020-02-01T00:00:00.000Z");
  const [endDate, setEndDate] = useState("2024-12-31T00:00:00.000Z");

  useEffect(() => {
    function fetchClinicData() {
      // This function is provisional; once implemented, this data will be fetched from the clinic
      setInitialDate("2020-02-01T00:00:00.000Z");
      setEndDate("2024-12-31T00:00:00.000Z");
    }

    fetchClinicData();
  }, []); // Empty dependency array ensures this runs only on mount

  return { initialDate, endDate };
}
