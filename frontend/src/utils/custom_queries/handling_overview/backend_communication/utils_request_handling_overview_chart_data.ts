import { HandlingOverviewMonthlyDataType } from "../../../../types";
import { ChartOptions } from "../../../../types/data_types";
import { handlingOverviewDetailsOptions } from "../../../../components/charts/handling_overview/handling_overview_details_options";
import { ValidQueryKeys } from "../../../../types";

/**
 * Fetches handling overview chart data from the backend based on a given query type (daily, monthly, yearly).
 *
 * This function constructs a request to the backend API using the specified date range and query type.
 * It retrieves data related to call handling performance and formats it into chart-ready options.
 *
 * @param query - A `ValidQueryKeys` value indicating the data granularity (`daily`, `monthly`, `yearly`).
 * @param initialDate - The start date for the data request (ISO 8601 format).
 * @param endDate - The end date for the data request (ISO 8601 format).
 * @param xAxisName - The label to be displayed on the X-axis of the chart.
 * @param yAxisName - The label to be displayed on the Y-axis of the chart.
 * @param title - The title to be displayed on the chart.
 *
 * @returns A `Promise` resolving to a `ChartOptions` object containing the formatted chart data.
 *
 * @throws An error if an invalid query type is provided or if the backend request fails.
 */
export async function requestHandlingOverviewChartData({
  query,
  initialDate,
  endDate,
  xAxisName,
  yAxisName,
  title,
}: {
  query: ValidQueryKeys;
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
}): Promise<ChartOptions> {
  /**
   * Maps valid query keys to their respective backend API endpoints.
   * Ensures that only predefined query types are used to prevent invalid requests.
   */
  const validEndpoints: Record<ValidQueryKeys, string> = {
    daily_data_in_date_range: "daily_data_in_date_range",
    monthly_data_in_date_range: "monthly_data_in_date_range",
    yearly_data_in_date_range: "yearly_data_in_date_range",
  };

  const desiredEndpoint = validEndpoints[query];

  // Validate the query parameter before proceeding
  if (!desiredEndpoint) {
    throw new Error(`Invalid query parameter: ${query}`);
  }

  /**
   * Construct the API request URL using the determined endpoint and provided date range.
   */
  const baseURL = "server_connect/handling_overview";
  const requestURL = `${baseURL}/${desiredEndpoint}?start_date=${initialDate}&end_date=${endDate}`;

  // Fetch data from the backend API
  const dbResponse = await fetch(requestURL);

  // Handle failed responses from the backend
  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }

  // Parse the retrieved JSON data from the database
  const dataFromDB: HandlingOverviewMonthlyDataType = await dbResponse.json();

  /**
   * Format the retrieved data into chart-ready options using the shared function.
   */
  return handlingOverviewDetailsOptions({
    fetchedData: dataFromDB || [],
    xAxisName,
    yAxisName,
    title,
  });
}
