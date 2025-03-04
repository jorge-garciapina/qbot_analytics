import { getMonthlyDataInDateRange } from "../../models/handling_overview/data_details_chart";
import { getYearlyData } from "../../models/handling_overview/data_details_chart";
import { getDailyDataInDateRange } from "../../models/handling_overview/data_details_chart";

/**
 * Processes daily data output, ensuring correct structure and multi-year handling.
 *
 * @param startDate - The start date of the requested range (ISO format).
 * @param endDate - The end date of the requested range (ISO format).
 * @returns A Promise resolving to the structured daily data response.
 */
export async function processDailyDataOutput(
  startDate: string,
  endDate: string
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear) {
    // Retrieve data within the same year
    return getDailyDataInDateRange({
      initialDate: startDate,
      finalDate: endDate,
    });
  }

  // Retrieve data spanning across two different years
  const firstYearData = await getDailyDataInDateRange({
    initialDate: startDate,
    finalDate: `${startYear}-12-31T23:59:59.999Z`,
  });

  const secondYearData = await getDailyDataInDateRange({
    initialDate: `${endYear}-01-01T00:00:00.000Z`,
    finalDate: endDate,
  });

  return {
    xAxis: [...firstYearData.xAxis, ...secondYearData.xAxis],
    callsHandledByHuman: [
      ...firstYearData.callsHandledByHuman,
      ...secondYearData.callsHandledByHuman,
    ],
    callsHandledByAI: [
      ...firstYearData.callsHandledByAI,
      ...secondYearData.callsHandledByAI,
    ],
    year: startYear === endYear ? startYear : -1,
  };
}
/**
 * Processes monthly data output, ensuring correct structure and multi-year handling.
 *
 * @param startDate - The start date of the requested range (ISO format).
 * @param endDate - The end date of the requested range (ISO format).
 * @returns A Promise resolving to the structured monthly data response.
 */
export async function processMonthlyDataOutput(
  startDate: string,
  endDate: string
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (startYear === endYear) {
    return getMonthlyDataInDateRange({ startDate, endDate });
  }

  const firstYearData = await getMonthlyDataInDateRange({
    startDate,
    endDate: `${startYear}-12-31T23:59:59.999Z`,
  });

  const secondYearData = await getMonthlyDataInDateRange({
    startDate: `${endYear}-01-01T00:00:00.000Z`,
    endDate,
  });

  return {
    xAxis: [...firstYearData.xAxis, ...secondYearData.xAxis],
    callsHandledByHuman: [
      ...firstYearData.callsHandledByHuman,
      ...secondYearData.callsHandledByHuman,
    ],
    callsHandledByAI: [
      ...firstYearData.callsHandledByAI,
      ...secondYearData.callsHandledByAI,
    ],
    year: startYear === endYear ? startYear : -1,
  };
}
/**
 * Processes yearly data output by retrieving data for each year in the requested range.
 *
 * @param startDate - The start date of the requested range (ISO format).
 * @param endDate - The end date of the requested range (ISO format).
 * @returns A Promise resolving to the structured yearly data response.
 */
export async function processYearlyDataOutput(
  startDate: string,
  endDate: string
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startYear = start.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  let combinedData = {
    xAxis: [] as string[],
    callsHandledByHuman: [] as number[],
    callsHandledByAI: [] as number[],
    year: startYear === endYear ? startYear : -1,
  };

  for (let year = startYear; year <= endYear; year++) {
    const yearlyData = await getYearlyData({ year });

    combinedData.xAxis.push(...yearlyData.xAxis);
    combinedData.callsHandledByHuman.push(...yearlyData.callsHandledByHuman);
    combinedData.callsHandledByAI.push(...yearlyData.callsHandledByAI);
  }

  return combinedData;
}
