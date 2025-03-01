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
 * This function will retrieve the data in the same format as it is expected to build the
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
