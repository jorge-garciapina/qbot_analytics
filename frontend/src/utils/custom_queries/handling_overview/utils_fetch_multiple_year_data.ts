import { YearCallRecord } from "../../../types/data_types";

export async function fetchMultipleYearData({
  queryKey,
}: {
  queryKey: [string, number, number];
}): Promise<YearCallRecord[]> {
  const [query, initialYear, endYear] = queryKey;

  if (query != "get_multiple_year_data") {
    throw new Error(`Failed to fetch data from DB`);
  }

  const dbResponse = await fetch(
    `server_connect/handling_overview/multiple_year_data?initial_year=${initialYear}&end_year=${endYear}`
  );

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  return dataFromDB;
}
