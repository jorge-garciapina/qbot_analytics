// src/utils/custom_queries/handling_overview/utils_request_handling_overview_chart_data_raw.ts
import { ValidQueryKeys } from "../../../types";
import { HandlingOverviewDataType } from "../../../types";

interface RequestRawDataInput {
  query: ValidQueryKeys;
  initialDate: string;
  endDate: string;
}

/**
 * Performs the backend request and returns untransformed raw data.
 */
export async function requestHandlingOverviewChartDataRaw({
  query,
  initialDate,
  endDate,
}: RequestRawDataInput): Promise<HandlingOverviewDataType> {
  const validEndpoints: Record<ValidQueryKeys, string> = {
    daily_data_in_date_range: "daily_data_in_date_range",
    monthly_data_in_date_range: "monthly_data_in_date_range",
    yearly_data_in_date_range: "yearly_data_in_date_range",
  };

  const endpoint = validEndpoints[query];
  if (!endpoint) {
    throw new Error(`Invalid query parameter: ${query}`);
  }

  const baseURL = "server_connect/handling_overview";
  const requestURL = `${baseURL}/${endpoint}?start_date=${initialDate}&end_date=${endDate}`;

  const dbResponse = await fetch(requestURL);
  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }

  // Return the raw JSON data (without converting to chart options)
  const dataFromDB: HandlingOverviewDataType = await dbResponse.json();
  return dataFromDB;
}
