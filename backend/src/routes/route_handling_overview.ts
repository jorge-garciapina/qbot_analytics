import express, { Router, Request, Response } from "express";
import { getYearlyData } from "../models/data_handling_overview";

const router: Router = express.Router();

// -----------------------------------------------------------------------
/**
 * This route is created to get all the call entries of the provided year INTERVAL
 */
router.get(
  "/multiple_year_data",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const initialYear = Number(req.query.initial_year);
      const endYear = Number(req.query.end_year);

      const yearsArray = Array.from(
        { length: endYear - initialYear + 1 },
        (_, i) => initialYear + i
      );

      // Use Promise.all to wait for all asynchronous calls to complete
      const processedData = await Promise.all(
        yearsArray.map(async (year) => getYearlyData(year))
      );

      res.status(200).json(processedData); // Respond with the array of retrieved yearly data
    } catch (err) {
      console.error("Error fetching multiple years of data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// -----------------------------------------------------------------------

// Export the router
export default router;
