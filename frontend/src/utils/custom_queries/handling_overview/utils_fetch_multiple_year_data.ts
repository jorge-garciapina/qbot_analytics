import { HandlingOverviewMonthlyDataType } from "../../../types";
export async function fetchMultipleYearData({
  queryKey,
}: {
  queryKey: [string, number, number];
}): Promise<HandlingOverviewMonthlyDataType[]> {
  const [query, initialYear, endYear] = queryKey;
  const desiredEndpoint = "multiple_year_data";

  if (query != desiredEndpoint) {
    throw new Error(`Failed to fetch data from DB`);
  }
  const baseURL = "server_connect/handling_overview";

  const dbResponse = await fetch(
    `${baseURL}/${desiredEndpoint}?initial_year=${initialYear}&end_year=${endYear}`
  );

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  return dataFromDB;
}
