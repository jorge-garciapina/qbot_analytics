import mongoose, { Model } from "mongoose";
import { callSchema } from "./data_schema";

import { RawCallRecord } from "../types/data_types";

//----------------------------------------------------------------------------------
export async function handlingOverviewTotalData({
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
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    /**
     * In this part, the code filters the data by range and agregates the
     * information of the CALL STATUS
     */
    const intervalData = await DynamicCallModel.aggregate([
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      {
        $group: {
          _id: "$status", // Group by the "status" field
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
    ]);

    /**
     * In this part, the code creates an object to display the status information
     * in a concise way
     */
    const handlingOverviewTotal = intervalData.reduce(
      (accumulator, current) => {
        if (current._id === "transferred") {
          accumulator.handledByHuman = current.count;
        } else if (current._id === "scheduled") {
          accumulator.handledByAI = current.count;
        }
        accumulator.total += current.count;

        return accumulator;
      },

      {
        total: 0,
        handledByAI: 0,
        handledByHuman: 0,
      }
    );

    const handledByAIPercentage =
      (handlingOverviewTotal.handledByAI / handlingOverviewTotal.total) * 100;

    const handledByHumanPercentage =
      (handlingOverviewTotal.handledByHuman / handlingOverviewTotal.total) *
      100;

    return {
      ...handlingOverviewTotal,
      handledByAIPercentage: handledByAIPercentage,
      handledByHumanPercentage: handledByHumanPercentage,
    };
  }

  return [];
}

//----------------------------------------------------------------------------------
/**
 * OPTION 2: This function will retrieve the data in the same format as it is expected to build the
 * charts using Apache E-charts
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 * chartKeys: ["2025-01-01", "2025-01-02", ...],
 * callsHandledByAI: [98, 80,...]
 * callsHandledByHuman: [29, 60,...]
 *   }
 */
export async function handlingOverviewChartData({
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
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter by time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Group by day and sum the status values
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } },
          callsHandledByHuman: {
            $sum: { $cond: [{ $eq: ["$status", "transferred"] }, 1, 0] },
          },
          callsHandledByAI: {
            $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] },
          },
        },
      },
      // 3. Add total count for each day
      {
        $addFields: {
          totalCalls: { $add: ["$callsHandledByHuman", "$callsHandledByAI"] },
        },
      },
      // 4. Sort by day
      {
        $sort: { _id: 1 },
      },
    ]);

    // Aggregate into the final object
    const handlingOverviewDaily = aggregation.reduce(
      (accumulator, current) => {
        const currentDay = current._id;
        const totalCallsHandledByAI = current.callsHandledByAI;
        const totalCallsHandledByHuman = current.callsHandledByHuman;
        const totalCalls = current.totalCalls;

        const aiPercentage =
          totalCalls > 0 ? (totalCallsHandledByAI / totalCalls) * 100 : 0;
        const humanPercentage =
          totalCalls > 0 ? (totalCallsHandledByHuman / totalCalls) * 100 : 0;

        accumulator.chartKeys.push(currentDay);
        accumulator.callsHandledByAI.push(totalCallsHandledByAI);
        accumulator.callsHandledByHuman.push(totalCallsHandledByHuman);
        accumulator.callsHandledByAIPercentage.push(aiPercentage);
        accumulator.callsHandledByHumanPercentage.push(humanPercentage);
        return accumulator;
      },
      {
        chartKeys: [],
        callsHandledByAI: [],
        callsHandledByHuman: [],
        callsHandledByAIPercentage: [],
        callsHandledByHumanPercentage: [],
      }
    );

    return handlingOverviewDaily;
  }

  return {
    chartKeys: [],
    callsHandledByAI: [],
    callsHandledByHuman: [],
    callsHandledByAIPercentage: [],
    callsHandledByHumanPercentage: [],
  };
}

//----------------------------------------------------------------------------------
/**
 * This function retrieves the data related with the call durations
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 * chartKeys: ["2025-01-01", "2025-01-02", ...],
 * callsHandledByAIAverageDuration: [98.8481, 80.3215,...]
 * callsHandledByHumanAverageDuration: [29.8743, 60.2884,...]
 *   }
 */
export async function avarageCallDurationData({
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
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter calls by the time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Add a duration field to each document
      {
        $addFields: {
          durationInSeconds: {
            $divide: [{ $subtract: ["$endTime", "$startTime"] }, 1000], // Calculate duration in seconds
          },
        },
      },
      // 3. Group by day and call status, calculate footerSummaryInTimeInterval and counts
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$startTime" } }, // Group by day
            status: "$status", // Group by status
          },
          totalDuration: { $sum: "$durationInSeconds" }, // Total duration for the day and status
          totalCount: { $sum: 1 }, // Count of calls for the day and status
        },
      },
      // 4. Reshape the data into a day-based structure
      {
        $group: {
          _id: "$_id.day", // Group by day
          dailyStats: {
            $push: {
              status: "$_id.status",
              averageDuration: { $divide: ["$totalDuration", "$totalCount"] }, // Average duration for each status
            },
          },
        },
      },
      // 5. Transform the data into the desired format
      {
        $project: {
          _id: 0,
          day: "$_id", // Use the day as a field
          callsHandledByAIAverageDuration: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$dailyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "scheduled"] }, // Extract scheduled (AI-handled)
                    },
                  },
                  0,
                ],
              },
              { averageDuration: 0 },
            ],
          },
          callsHandledByHumanAverageDuration: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$dailyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "transferred"] }, // Extract transferred (human-handled)
                    },
                  },
                  0,
                ],
              },
              { averageDuration: 0 },
            ],
          },
        },
      },
      // 6. Flatten the average duration fields
      {
        $project: {
          day: 1,
          callsHandledByAIAverageDuration:
            "$callsHandledByAIAverageDuration.averageDuration",
          callsHandledByHumanAverageDuration:
            "$callsHandledByHumanAverageDuration.averageDuration",
        },
      },

      // 7. Sort by day in ascending order
      {
        $sort: { day: 1 }, // Sort by day in ascending order
      },
    ]);

    const callsAverageDuration = aggregation.reduce(
      (accumulator, current) => {
        accumulator.chartKeys.push(current.day);
        accumulator.callsHandledByAIAverageDuration.push(
          current.callsHandledByAIAverageDuration
        );
        accumulator.callsHandledByHumanAverageDuration.push(
          current.callsHandledByHumanAverageDuration
        );

        return accumulator;
      },
      {
        chartKeys: [],
        callsHandledByAIAverageDuration: [],
        callsHandledByHumanAverageDuration: [],
      }
    );

    const totalCalls = callsAverageDuration.chartKeys.length;

    const callsHandledByAIPercentage =
      callsAverageDuration.callsHandledByAIAverageDuration.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / totalCalls;

    const callsHandledByHumanPercentage =
      callsAverageDuration.callsHandledByHumanAverageDuration.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ) / totalCalls;

    return {
      ...callsAverageDuration,
      callsHandledByAIPercentage: callsHandledByAIPercentage,
      callsHandledByHumanPercentage: callsHandledByHumanPercentage,
    };
  }

  return {};
}

//----------------------------------------------------------------------------------
/**
 * This function retrieves the call volume in different hours of the day (from 00:00 to 23:00) of the
 * selected interval of time (between "initialDate" and "endDate")
 * @param initialDate - Initial date of the interval
 * @param finalDate - Final date of the interval
 * @returns {
 *   hourOfTheDay: ["00:00", "01:00", "02:00",...],
 *   callsHandledByHuman: [46, 65, 60,...],
 *   callsHandledByAI: [109, 118, 98,...],
 *   total: [155, 183, 158,...],
 * }
 */
export async function peakCallTimesData({
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
    const schemaName = `calls_${initialDateYear}`;
    const DynamicCallModel: Model<RawCallRecord> =
      mongoose.model<RawCallRecord>(schemaName, callSchema);

    const aggregation = await DynamicCallModel.aggregate([
      // 1. Filter calls by the time interval
      {
        $match: {
          startTime: {
            $gte: initial,
            $lte: final,
          },
        },
      },
      // 2. Group calls by hour of the day and status
      {
        $group: {
          _id: {
            hour: { $dateToString: { format: "%H:00", date: "$startTime" } }, // Extract hour
            status: "$status", // Group by status (scheduled or transferred)
          },
          totalCalls: { $sum: 1 }, // Count total calls
        },
      },
      // 3. Reshape the data into an hour-based structure
      {
        $group: {
          _id: "$_id.hour", // Group by hour
          hourlyStats: {
            $push: {
              status: "$_id.status",
              count: "$totalCalls",
            },
          },
        },
      },
      // 4. Transform the data into the desired format
      {
        $project: {
          _id: 0,
          hourOfTheDay: "$_id", // Use the hour as a field
          callsHandledByHuman: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$hourlyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "transferred"] }, // Human-handled calls
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
          callsHandledByAI: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$hourlyStats",
                      as: "stat",
                      cond: { $eq: ["$$stat.status", "scheduled"] }, // AI-handled calls
                    },
                  },
                  0,
                ],
              },
              { count: 0 },
            ],
          },
        },
      },
      // 5. Flatten the count fields and calculate the total
      {
        $project: {
          hourOfTheDay: 1,
          callsHandledByHuman: "$callsHandledByHuman.count",
          callsHandledByAI: "$callsHandledByAI.count",
          total: {
            $add: ["$callsHandledByHuman.count", "$callsHandledByAI.count"], // Total calls per hour
          },
        },
      },
      // 6. Sort by hourOfTheDay in ascending order
      {
        $sort: { hourOfTheDay: 1 },
      },
    ]);

    const callsVolumePeak = aggregation.reduce(
      (accumulator, current) => {
        accumulator.hourOfTheDay.push(current.hourOfTheDay);
        accumulator.callsHandledByHuman.push(current.callsHandledByHuman);
        accumulator.callsHandledByAI.push(current.callsHandledByAI);
        accumulator.total.push(current.total);
        return accumulator;
      },
      {
        hourOfTheDay: [],
        callsHandledByHuman: [],
        callsHandledByAI: [],
        total: [],
      }
    );

    // Find the maximum value
    const peakVolume = Math.max(...callsVolumePeak.total);
    const peakHour = callsVolumePeak.total.indexOf(peakVolume);

    return { ...callsVolumePeak, peakHour: peakHour, peakVolume: peakVolume };
  }

  return [];
}
