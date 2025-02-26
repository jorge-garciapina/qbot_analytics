import { HandlingOverviewMonthlyDataType } from "../../../types";
export async function fetchHandlingOverviewMonthlyData({
  queryKey,
}: {
  queryKey: [string, string, string];
}): Promise<HandlingOverviewMonthlyDataType> {
  const test = 0;
  const [query, initialDate, endDate] = queryKey;

  const desiredEndpoint = "monthly_data_in_date_range";

  if (query != "monthly_data_in_date_range") {
    throw new Error(`Failed to fetch data from DB`);
  }

  const baseURL = "server_connect/handling_overview";
  const dbResponse = await fetch(
    `${baseURL}/${desiredEndpoint}?start_date=${initialDate}&end_date=${endDate}`
  );

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  return dataFromDB;
}
