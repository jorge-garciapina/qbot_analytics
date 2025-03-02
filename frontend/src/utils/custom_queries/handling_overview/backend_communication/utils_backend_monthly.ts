import { HandlingOverviewMonthlyDataType } from "../../../../types";
import { ChartOptions } from "../../../../types/data_types";
import { handlingOverviewDetailsOptions } from "../../../../components/charts/handling_overview/details_options_generators/handling_overview_details_options";
interface MonthlyQuery {
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
}: MonthlyQuery): Promise<ChartOptions> {
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

  console.log("MONTHLY DATA: ", dataFromDB);

  const chartOptions = handlingOverviewDetailsOptions({
    fetchedData: dataFromDB || [],
    xAxisName,
    yAxisName,
    title,
  });

  return chartOptions;
}
