import mongoose, { Model } from "mongoose";
import { callSchema } from "./data_schema";
import { RawCallRecord } from "../types/data_types";
import {
  AggregatedData,
  HandlingOverviewMonthlyData,
  DateRangeType,
} from "../types/types_handling_overview";

import { monthsArray } from "../utils/date_related/constants";
// Define the structure of the aggregated data

//----------------------------------------------------------------------------------
// Function to retrieve call volume data for a given year, categorized by status and month.
export async function getMonthlyDataInGivenYear(
  inputYear: number
): Promise<HandlingOverviewMonthlyData> {
  const year: number = inputYear;

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
          $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Start of the year
          $lte: new Date(`${year}-12-31T23:59:59.999Z`), // End of the year
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

  // List of month names

  /**
   * Finds the data element for a given call status
   * @param callReason - The status of the call (e.g., "scheduled", "transferred")
   * @returns The corresponding data object or undefined if not found
   */
  function findElement(callReason: string): AggregatedData | undefined {
    return monthlyData.find((element) => element.status === callReason);
  }

  // Construct an array of scheduled call volumes for each month
  const scheduledCallsByMonth: number[] = monthsArray.map(
    (month) => findElement("scheduled")?.countsByMonth[month] || 0 // Default to 0 if undefined
  );

  // Construct an array of transferred call volumes for each month
  const transferredCallsByMonth: number[] = monthsArray.map(
    (month) => findElement("transferred")?.countsByMonth[month] || 0 // Default to 0 if undefined
  );

  // Return structured call volume data
  const HandlingOverviewYearData: HandlingOverviewMonthlyData = {
    months: monthsArray,
    scheduledCallsByMonth,
    transferredCallsByMonth,
    year,
  };

  return HandlingOverviewYearData;
}
//--------------------------------------------------------------------------------------
// Function to retrieve call volume data for a given year, categorized by status and month.

export async function getMonthlyDataInDateRange({
  startDate,
  endDate,
}: DateRangeType): Promise<HandlingOverviewMonthlyData> {
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

  const scheduledCallsByMonth: number[] = months.map(
    (month) => findElement("scheduled").countsByMonth[month] || 0
  );
  const transferredCallsByMonth: number[] = months.map(
    (month) => findElement("transferred").countsByMonth[month] || 0
  );

  return {
    months,
    scheduledCallsByMonth,
    transferredCallsByMonth,
    year,
  };
}
