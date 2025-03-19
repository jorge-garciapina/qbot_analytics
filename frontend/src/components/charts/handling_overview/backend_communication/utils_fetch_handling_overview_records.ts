import { ValidGranularities } from "../../../../common/types";
import { HandlingOverviewDataType } from "../types/types_handling_overview";

interface FetchHandlingOverviewRecordsInput {
  initialDate: string;
  endDate: string;
  granularity: ValidGranularities;
}

type ValidQueryKeys =
  | "yearly_data_in_date_range"
  | "monthly_data_in_date_range"
  | "daily_data_in_date_range";

/**
 * Returns raw handling overview data from the backend, without converting it to chart options.
 */
export async function fetchHandlingOverviewRecords({
  initialDate,
  endDate,
  granularity,
}: FetchHandlingOverviewRecordsInput): Promise<HandlingOverviewDataType> {
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
