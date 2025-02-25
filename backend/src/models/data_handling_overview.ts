import mongoose, { Model } from "mongoose";
import { callSchema } from "./data_schema";

import { RawCallRecord } from "../dataTypes";

//----------------------------------------------------------------------------------
export async function getYearlyData(inputYear: number) {
  const year = inputYear;
  // Dynamically create the model for the year's collection
  const schemaName = `calls_${year}`;

  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  const monthlyData = await DynamicCallModel.aggregate([
    {
      // Match calls within the given year
      $match: {
        startTime: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      // Group by status and month
      $group: {
        _id: {
          status: "$status",
          month: { $month: "$startTime" }, // Extract the month from the startTime
        },
        count: { $sum: 1 }, // Count the number of calls
      },
    },
    {
      // Transform the data into a more usable format
      $group: {
        _id: "$_id.status",
        monthlyCounts: {
          $push: {
            month: "$_id.month",
            count: "$count",
          },
        },
      },
    },
    {
      // Reshape the final output
      $project: {
        _id: 0,
        status: "$_id",
        countsByMonth: {
          $arrayToObject: {
            $map: {
              input: "$monthlyCounts",
              as: "entry",
              in: {
                k: {
                  $let: {
                    vars: {
                      months: [
                        "january",
                        "february",
                        "march",
                        "april",
                        "may",
                        "june",
                        "july",
                        "august",
                        "september",
                        "october",
                        "november",
                        "december",
                      ],
                    },
                    in: {
                      $arrayElemAt: [
                        "$$months",
                        { $subtract: ["$$entry.month", 1] },
                      ],
                    },
                  },
                },
                v: "$$entry.count",
              },
            },
          },
        },
      },
    },
  ]);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  function findElement(callReason: string) {
    return monthlyData.find((element) => element.status === callReason);
  }

  const scheduledCallsByMonth = months.reduce((accumulator, month) => {
    const monthVolume = findElement("scheduled").countsByMonth[month];
    accumulator.push(monthVolume);
    return accumulator;
  }, [] as number[]);

  const transferredCallsByMonth = months.reduce((accumulator, month) => {
    const monthVolume = findElement("transferred").countsByMonth[month];
    accumulator.push(monthVolume);
    return accumulator;
  }, [] as number[]);

  const callReasonsVolume = {
    months: months,
    scheduledCallsByMonth: scheduledCallsByMonth,
    transferredCallsByMonth: transferredCallsByMonth,
    year: year,
  };

  return callReasonsVolume;
}
