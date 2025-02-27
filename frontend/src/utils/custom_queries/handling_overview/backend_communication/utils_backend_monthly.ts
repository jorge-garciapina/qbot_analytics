import { HandlingOverviewMonthlyDataType } from "../../../../types";
import { handlingOverviewMonthlyOptions } from "../../../../components/charts/handling_overview/details_options_generators/utils_monthly_options";
import { ChartOptions } from "../../../../types/data_types";
interface MultipleYearQuery {
  query: "monthly_data_in_date_range";
  initialDate: string;
  endDate: string;
  xAxisName: string;
  yAxisName: string;
  title: string;
}

export async function handlingOverviewBCMonthly({
  query,
  initialDate,
  endDate,
  xAxisName,
  yAxisName,
  title,
}: MultipleYearQuery): Promise<ChartOptions> {
  console.log(query, initialDate, endDate, xAxisName, yAxisName, title);
  const desiredEndpoint = "monthly_data_in_date_range";

  if (query != desiredEndpoint) {
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
  const dataFromDB: HandlingOverviewMonthlyDataType = await dbResponse.json();

  //------------ END: New loic for fetching ------------

  const chartOptions = handlingOverviewMonthlyOptions({
    fetchedData: dataFromDB || [],
    xAxisName,
    yAxisName,
    title,
  });

  return chartOptions;
}
