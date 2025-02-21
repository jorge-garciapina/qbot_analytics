import { YearCallRecords } from "../../types/data_types";

export async function fetchYearlyData({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<YearCallRecords> {
  const [query, year] = queryKey;

  if (query != "get_yearly_data") {
    throw new Error(`Failed to fetch data from DB`);
  }

  const dbResponse = await fetch(`/calls/yearly_data?year=${year}`);

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  return dataFromDB;
}
