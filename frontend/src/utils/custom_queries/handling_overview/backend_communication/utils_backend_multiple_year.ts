import { HandlingOverviewMonthlyDataType } from "../../../../types";
import { handlingOverviewMultipleYearOptions } from "../../../../components/charts/handling_overview/details_options_generators/utils_multiple_year_options";
import { ChartOptions } from "../../../../types/data_types";
interface MultipleYearQuery {
  query: "multiple_year_data";
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
}

export async function handlingOverviewBCMultipleYear({
  query,
  initialDate,
  endDate,
  xAxisName,
  yAxisName,
  title,
}: MultipleYearQuery): Promise<ChartOptions> {
  const desiredEndpoint = "multiple_year_data";

  if (query != desiredEndpoint) {
    throw new Error(`Failed to fetch data from DB`);
  }
  const baseURL = "server_connect/handling_overview";

  const dbResponse = await fetch(
    `${baseURL}/${desiredEndpoint}?initial_date=${initialDate}&end_date=${endDate}`
  );

  if (!dbResponse.ok) {
    throw new Error(`Failed to fetch data from DB: ${dbResponse.statusText}`);
  }
  // Parse the JSON from the DB response
  const dataFromDB: HandlingOverviewMonthlyDataType[] = await dbResponse.json();

  const chartOptions = handlingOverviewMultipleYearOptions({
    fetchedData: dataFromDB || [],
    xAxisName,
    yAxisName,
    title,
  });

  return chartOptions;
}
