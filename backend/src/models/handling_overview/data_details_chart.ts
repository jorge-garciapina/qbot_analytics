import mongoose, { Model } from "mongoose";
import { callSchema } from "../data_schema";
import { RawCallRecord } from "../../types/data_types";
import {
  AggregatedData,
  HandlingOverviewDetailsChartData,
  DateRangeType,
} from "../../types/types_handling_overview";

import { monthsArray } from "../../utils/date_related/constants";
// Define the structure of the aggregated data

//----------------------------------------------------------------------------------
/**
 * This function retrieves daily call data within a specified date range.
 * It returns data in a structured format that aligns with Apache E-Charts expectations.
 *
 * The function groups call records by day and counts the number of scheduled and transferred calls.
 * If no data is found for a specific day, it assigns a default count of 0.
 *
 * @param initialDate - The starting date of the interval (YYYY-MM-DD).
 * @param finalDate - The ending date of the interval (YYYY-MM-DD).
 * @returns {
 *   xAxis: ["2025-01-01", "2025-01-02", ...],
 *   callsHandledByHuman: [98, 80, ...],  // Number of scheduled calls per day
 *   callsHandledByAI: [29, 60, ...], // Number of transferred calls per day
 *   year: 2025
 * }
 */

export async function getDailyDataInDateRange({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) {
  const initial = new Date(initialDate);
  const final = new Date(finalDate);

  const initialDateYear = initial.getFullYear();
  const finalDateYear = final.getFullYear();

  if (initialDateYear === finalDateYear) {
    // If both dates are in the same year, process normally
    return await fetchDailyData(initialDate, finalDate, initialDateYear);
  }

  // If dates span multiple years, fetch each year separately
  const firstYearData = await fetchDailyData(
    initialDate,
    `${initialDateYear}-12-31T23:59:59.999Z`,
    initialDateYear
  );
  const secondYearData = await fetchDailyData(
    `${finalDateYear}-01-01T00:00:00.000Z`,
    finalDate,
    finalDateYear
  );

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
    year: `${initialDateYear}-${finalDateYear}`,
  };
}

/**
 * Helper function to retrieve daily call data for a specific year.
 */
async function fetchDailyData(
  startDate: string,
  endDate: string,
  year: number
) {
  const schemaName = `calls_${year}`;
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  const aggregation = await DynamicCallModel.aggregate([
    // 1. Filter records within the specified date range
    {
      $match: {
        startTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    // 2. Group by day and count occurrences of each call status
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
        scheduled: {
          $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] },
        },
        transferred: {
          $sum: { $cond: [{ $eq: ["$status", "transferred"] }, 1, 0] },
        },
      },
    },
    // 3. Sort results in ascending order by date
    {
      $sort: { _id: 1 },
    },
  ]);

  // Extract unique days in the given date range
  const days: string[] = aggregation.map((entry) => entry._id);

  // Function to find data or return a default value if not found
  function findElement(day: string) {
    return (
      aggregation.find((element) => element._id === day) || {
        _id: day,
        scheduled: 0,
        transferred: 0,
      }
    );
  }

  // Map results into structured arrays
  const callsHandledByHuman: number[] = days.map(
    (day) => findElement(day).scheduled || 0
  );
  const callsHandledByAI: number[] = days.map(
    (day) => findElement(day).transferred || 0
  );

  return {
    xAxis: days,
    callsHandledByHuman,
    callsHandledByAI,
    year,
  };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------------------
/**
 * This function retrieves monthly call data within a specified year.
 * It returns data in a structured format that aligns with Apache E-Charts expectations.
 *
 * The function groups call records by month and counts the number of scheduled and transferred calls.
 * If no data is found for a specific month, it assigns a default count of 0.
 *
 * @param startDate - The starting date of the interval (YYYY-MM-DD).
 * @param endDate - The ending date of the interval (YYYY-MM-DD).
 * @returns {
 *   months: ["January", "February", ...],
 *   callsHandledByHuman: [98, 80, ...],  // Number of scheduled calls per month
 *   callsHandledByAI: [29, 60, ...], // Number of transferred calls per month
 *   year: 2025
 * }
 */
export async function getMonthlyDataInDateRange({
  startDate,
  endDate,
}: DateRangeType): Promise<HandlingOverviewDetailsChartData> {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  // Extract the UTC year instead of the local year
  const year: number = start.getUTCFullYear();
  const startMonth: number = start.getUTCMonth() + 1;
  const endMonth: number = end.getUTCMonth() + 1;

  // Dynamically define the schema name based on the input year
  const schemaName: string = `calls_${year}`;

  // Create a dynamic Mongoose model for the corresponding yearly collection
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  // Perform an aggregation query to compute call volumes by status and month
  const monthlyData: AggregatedData[] = await DynamicCallModel.aggregate([
    {
      // Filter records to include only those within the specified year
      $match: {
        startTime: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      // Group records by call status and extract the month from startTime
      $group: {
        _id: {
          status: "$status",
          month: { $month: "$startTime" }, // Extract month from timestamp
        },
        count: { $sum: 1 }, // Count occurrences
      },
    },
    {
      // Group by status to accumulate monthly call counts
      $group: {
        _id: "$_id.status", // Group by call status
        monthlyCounts: {
          $push: {
            month: "$_id.month", // Store month
            count: "$count", // Store count for that month
          },
        },
      },
    },
    {
      // Transform the result into an object with month names as keys
      $project: {
        _id: 0,
        status: "$_id", // Rename _id field to status
        countsByMonth: {
          $arrayToObject: {
            $map: {
              input: "$monthlyCounts",
              as: "entry",
              in: {
                k: {
                  $let: {
                    vars: {
                      // Define month names array
                      months: monthsArray,
                    },
                    in: {
                      // Convert numerical month index (1-12) to a string
                      $arrayElemAt: [
                        "$$months",
                        { $subtract: ["$$entry.month", 1] }, // Adjust index to match array (0-based)
                      ],
                    },
                  },
                },
                v: "$$entry.count", // Assign corresponding count
              },
            },
          },
        },
      },
    },
  ]);

  const months: string[] = monthsArray.slice(startMonth - 1, endMonth);

  function findElement(callReason: string): AggregatedData {
    return (
      monthlyData.find((element) => element.status === callReason) || {
        status: callReason,
        countsByMonth: Object.fromEntries(months.map((month) => [month, 0])),
      }
    );
  }

  const callsHandledByHuman: number[] = months.map(
    (month) => findElement("scheduled").countsByMonth[month] || 0
  );
  const callsHandledByAI: number[] = months.map(
    (month) => findElement("transferred").countsByMonth[month] || 0
  );

  return {
    xAxis: months,
    callsHandledByHuman,
    callsHandledByAI,
    year,
  };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This function retrieves yearly call data for a given year.
 * It returns data in a structured format that aligns with Apache E-Charts expectations.
 *
 * The function groups call records by year and counts the number of scheduled and transferred calls.
 * If no data is found for a specific year, it assigns a default count of 0.
 *
 * @param year - The year for which data is requested (YYYY).
 * @returns {
 *   xAxis: ["2025"],  // Represents the year in the dataset
 *   callsHandledByHuman: [1200],  // Number of scheduled calls in the year
 *   callsHandledByAI: [800], // Number of transferred calls in the year
 *   year: 2025
 * }
 */
export async function getYearlyData({
  year,
}: {
  year: number;
}): Promise<HandlingOverviewDetailsChartData> {
  // Define the start and end dates for the given year
  const startDate: Date = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate: Date = new Date(`${year}-12-31T23:59:59.999Z`);

  // Dynamically define the schema name based on the input year
  const schemaName: string = `calls_${year}`;

  // Create a dynamic Mongoose model for the corresponding yearly collection
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  // Perform an aggregation query to compute call volumes by status for the entire year
  const yearlyData = await DynamicCallModel.aggregate([
    {
      // Filter records to include only those within the specified date range
      $match: {
        startTime: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      // Group records by call status and count occurrences
      $group: {
        _id: "$status", // Group by call status (scheduled or transferred)
        total: { $sum: 1 }, // Count occurrences
      },
    },
  ]);

  // Initialize default values for scheduled and transferred calls
  let scheduledCalls = 0;
  let transferredCalls = 0;

  // Assign values from aggregation results
  yearlyData.forEach((entry) => {
    if (entry._id === "scheduled") {
      scheduledCalls = entry.total;
    } else if (entry._id === "transferred") {
      transferredCalls = entry.total;
    }
  });

  return {
    xAxis: [`${year}`], // Representing the year on the x-axis
    callsHandledByHuman: [scheduledCalls],
    callsHandledByAI: [transferredCalls],
    year,
  };
}
