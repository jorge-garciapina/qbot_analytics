import { ValidGranularities } from "../../../hooks";
import { ChartOptions } from "../../../types/data_types";
import { handlingOverviewMultipleYearOptions } from "../../../components/charts/handling_overview/details_options_generators/utils_multiple_year_options";
import { handlingOverviewBCMultipleYear } from "./backend_communication/utils_backend_multiple_year";
import { handlingOverviewBCDaily } from "./backend_communication/utils_backend_daily";
import { handlingOverviewBCMonthly } from "./backend_communication/utils_backend_monthly";
export async function fetchDetailsData({
  queryKey,
}: {
  queryKey: [string, string, ValidGranularities, string, string, string];
}): Promise<ChartOptions> {
  const [initialDate, endDate, granularity, xAxisName, yAxisName, title] =
    queryKey;

  if (granularity === "hourly") {
    console.log(granularity);
  } else if (granularity === "daily") {
    console.log(granularity);
    const dailyOptions = await handlingOverviewBCDaily({
      query: "daily_data_in_date_range",
      initialDate,
      endDate,
      xAxisName,
      yAxisName,
      title,
    });

    return dailyOptions;
  } else if (granularity === "weekly") {
    console.log(granularity);
  } else if (granularity === "monthly") {
    const monthlyOptions = await handlingOverviewBCMonthly({
      query: "monthly_data_in_date_range",
      initialDate,
      endDate,
      xAxisName,
      yAxisName,
      title,
    });

    return monthlyOptions;
  } else if (granularity === "yearly") {
    const multipleYearOptions = await handlingOverviewBCMultipleYear({
      query: "multiple_year_data",
      initialDate,
      endDate,
      xAxisName,
      yAxisName,
      title,
    });

    return multipleYearOptions;
  }

  const chartOptions = handlingOverviewMultipleYearOptions({
    fetchedData: [],
    xAxisName,
    yAxisName,
    title,
  });

  return chartOptions;
}
