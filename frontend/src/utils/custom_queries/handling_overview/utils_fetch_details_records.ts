import { ValidGranularities } from "../../../hooks";
import { ChartOptions } from "../../../types/data_types";
import { requestHandlingOverviewChartData } from "./backend_communication/utils_request_handling_overview_chart_data";
import { ValidQueryKeys } from "../../../types";

/**
 * Asynchronously fetches and returns handling overview chart data based on the provided query parameters.
 *
 * This function determines the appropriate API query key based on the given granularity (e.g., daily, monthly, yearly)
 * and requests the corresponding chart data from the backend.
 *
 * @param queryKey - An array containing:
 *   - `initialDate` (string): The start date for fetching data (ISO 8601 format).
 *   - `endDate` (string): The end date for fetching data (ISO 8601 format).
 *   - `granularity` (ValidGranularities): Defines the data grouping level (e.g., daily, monthly, yearly).
 *   - `xAxisName` (string): The label for the X-axis.
 *   - `yAxisName` (string): The label for the Y-axis.
 *   - `title` (string): The chart title.
 *
 * @returns A `Promise` resolving to `ChartOptions` containing the formatted data ready for visualization.
 *
 * @throws An error if an unsupported granularity is provided.
 */
export async function fetchDetailsRecords({
  queryKey,
}: {
  queryKey: [string, string, ValidGranularities, string, string, string];
}): Promise<ChartOptions> {
  // Destructure queryKey array to extract parameters
  const [initialDate, endDate, granularity, xAxisName, yAxisName, title] =
    queryKey;

  /**
   * Maps each valid granularity to its respective backend query key.
   * - Only `daily`, `monthly`, and `yearly` granularities have valid API endpoints.
   * - Unsupported granularities (e.g., `hourly`, `weekly`) are mapped to an empty string.
   */
  const queryMap: Record<ValidGranularities, ValidQueryKeys | ""> = {
    hourly: "",
    daily: "daily_data_in_date_range",
    weekly: "",
    monthly: "monthly_data_in_date_range",
    yearly: "yearly_data_in_date_range",
  };

  /**
   * Determines the backend API query key based on the provided granularity.
   * - Defaults to "daily_data_in_date_range" if the granularity is unsupported.
   */
  const query: ValidQueryKeys =
    (queryMap[granularity] as ValidQueryKeys) || "daily_data_in_date_range";

  // Ensure the provided granularity is valid; otherwise, throw an error.
  if (!queryMap[granularity]) {
    throw new Error("No such granularity");
  }

  // Fetch and return chart data based on the determined query type.
  return requestHandlingOverviewChartData({
    query,
    initialDate,
    endDate,
    xAxisName,
    yAxisName,
    title,
  });
}
