import { CallRecordsMigration } from "../../types/data_types";

/**
 *
 * @param queryKey This key contains the information about the login: start and end date
 * @returns It returns the login data from the Database
 */
export async function fetchLoginData({
  queryKey,
}: {
  queryKey: [string, string, string];
}): Promise<CallRecordsMigration> {
  const [query, initialDate, endDate] = queryKey;

  if (query != "login") {
    throw new Error(`Failed to fetch data from DB`);
  }

  const dbResponse = await fetch(
    `/calls/login?initial_date=${initialDate}&final_date=${endDate}`
  );

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  return dataFromDB;
}
