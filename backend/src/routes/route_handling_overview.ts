import express, { Router, Request, Response } from "express";
import {
  getMonthlyDataInGivenYear,
  getMonthlyDataInDateRange,
  getDailyDataInDateRange,
} from "../models/data_handling_overview";
import { HandlingOverviewMonthlyData } from "./../types/types_handling_overview";

const router: Router = express.Router();
router.get("/year_data", async (req: Request, res: Response): Promise<void> => {
  try {
    const year: number = Number(req.query.year);

    const yearData = await getMonthlyDataInGivenYear(year);

    res.status(200).json(yearData); // Respond with the array of retrieved yearly data
  } catch (err) {
    console.error("Error fetching multiple years of data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// -----------------------------------------------------------------------
/**
 * This route is created to get all the call entries of the provided year INTERVAL
 */
router.get(
  "/multiple_year_data",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialDate: string = String(req.query.initial_date);
      const endDate: string = String(req.query.end_date);

      const start = new Date(initialDate);
      const end = new Date(endDate);

      const initialYear: number = start.getUTCFullYear();
      const endYear: number = end.getUTCFullYear();

      const yearsArray: number[] = Array.from(
        { length: endYear - initialYear + 1 },
        (_, i) => initialYear + i
      );

      // Use Promise.all to wait for all asynchronous calls to complete
      const processedData: HandlingOverviewMonthlyData[] = await Promise.all(
        yearsArray.map(async (year) => getMonthlyDataInGivenYear(year))
      );

      res.status(200).json(processedData); // Respond with the array of retrieved yearly data
    } catch (err) {
      console.error("Error fetching multiple years of data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
/**
 * Route to retrieve call data within a specified date range
 */
router.get(
  "/monthly_data_in_date_range",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const startDate = req.query.start_date as string;
      const endDate = req.query.end_date as string;

      if (!startDate || !endDate) {
        res
          .status(400)
          .json({ error: "Missing start_date or end_date parameter" });
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      const startYear = start.getUTCFullYear();
      const endYear = end.getUTCFullYear();
      const startMonth = start.getUTCMonth() + 1;
      const endMonth = end.getUTCMonth() + 1;

      const totalMonths =
        (endYear - startYear) * 12 + (endMonth - startMonth + 1);
      if (totalMonths > 12) {
        res.status(400).json({ error: "The range cannot exceed 12 months" });
        return;
      }

      let yearData: HandlingOverviewMonthlyData;

      if (startYear === endYear) {
        // Retrieve data within the same year
        yearData = await getMonthlyDataInDateRange({ startDate, endDate });
      } else {
        // Retrieve data spanning across two different years
        const firstYearData = await getMonthlyDataInDateRange({
          startDate,
          endDate: `${startYear}-12-31T23:59:59.999Z`,
        });

        const secondYearData = await getMonthlyDataInDateRange({
          startDate: `${endYear}-01-01T00:00:00.000Z`,
          endDate,
        });

        yearData = {
          xAxis: [...firstYearData.xAxis, ...secondYearData.xAxis],
          callsHandledByHuman: [
            ...firstYearData.callsHandledByHuman,
            ...secondYearData.callsHandledByHuman,
          ],
          callsHandledByAI: [
            ...firstYearData.callsHandledByAI,
            ...secondYearData.callsHandledByAI,
          ],
          year: startYear - endYear,
        };
      }

      res.status(200).json(yearData);
    } catch (err) {
      console.error("Error fetching data in date range:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------
/**
 * Route to retrieve daily call data within a specified date range
 */
router.get(
  "/daily_data_in_date_range",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const startDate = req.query.start_date as string;
      const endDate = req.query.end_date as string;

      if (!startDate || !endDate) {
        res
          .status(400)
          .json({ error: "Missing start_date or end_date parameter" });
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      const startYear = start.getUTCFullYear();
      const endYear = end.getUTCFullYear();
      const totalDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (totalDays > 30) {
        res.status(400).json({ error: "The range cannot exceed 30 days" });
        return;
      }

      let dailyData;

      if (startYear === endYear) {
        // Retrieve data within the same year
        dailyData = await getDailyDataInDateRange({
          initialDate: startDate,
          finalDate: endDate,
        });
      } else {
        // Retrieve data spanning across two different years
        const firstYearData = await getDailyDataInDateRange({
          initialDate: startDate,
          finalDate: `${startYear}-12-31T23:59:59.999Z`,
        });

        const secondYearData = await getDailyDataInDateRange({
          initialDate: `${endYear}-01-01T00:00:00.000Z`,
          finalDate: endDate,
        });

        dailyData = {
          xAxis: [...firstYearData.xAxis, ...secondYearData.xAxis],
          callsHandledByHuman: [
            ...firstYearData.callsHandledByHuman,
            ...secondYearData.callsHandledByHuman,
          ],
          callsHandledByAI: [
            ...firstYearData.callsHandledByAI,
            ...secondYearData.callsHandledByAI,
          ],
          year: startYear - endYear,
        };
      }

      res.status(200).json(dailyData);
    } catch (err) {
      console.error("Error fetching daily data in date range:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Export the router
export default router;
