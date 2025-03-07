import { ValidGranularities } from "../../../hooks";
import { HandlingOverviewDataType } from "../../../types";
import { ValidQueryKeys } from "../../../types";

interface FetchDetailsRecordsRawArgs {
  initialDate: string;
  endDate: string;
  granularity: ValidGranularities;
}

/**
 * Returns raw handling overview data from the backend, without converting it to chart options.
 */
export async function fetchDetailsRecordsRaw({
  initialDate,
  endDate,
  granularity,
}: FetchDetailsRecordsRawArgs): Promise<HandlingOverviewDataType> {
  // Map the granularity to a valid backend query endpoint
  const queryMap: Record<ValidGranularities, ValidQueryKeys | ""> = {
    hourly: "",
    daily: "daily_data_in_date_range",
    weekly: "",
    monthly: "monthly_data_in_date_range",
    yearly: "yearly_data_in_date_range",
  };

  const query = queryMap[granularity];
  if (!query) {
    throw new Error(`Granularity '${granularity}' is not supported`);
  }

  const baseURL = "server_connect/handling_overview";
  const requestURL = `${baseURL}/${query}?start_date=${initialDate}&end_date=${endDate}`;

  const dbResponse = await fetch(requestURL);
  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data: ${dbResponse.statusText}`);
  }

  // Return the raw JSON data
  const dataFromDB: HandlingOverviewDataType = await dbResponse.json();
  return dataFromDB;
}
