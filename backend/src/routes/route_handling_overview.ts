import express, { Router, Request, Response } from "express";
import {
  validateAndAdjustDailyRange,
  validateAndAdjustMonthlyRange,
  validateAndAdjustYearlyRange,
} from "./utils/validations";
import {
  processDailyDataOutput,
  processMonthlyDataOutput,
  processYearlyDataOutput,
} from "./utils/dataProcessors";

const router: Router = express.Router();

/**
 * Enum for granularity types.
 */
enum Granularity {
  DAILY = "daily",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * Mapping of routes to their corresponding validation and processing functions.
 */
const routeConfig: Record<
  string,
  {
    validateAndAdjustRange: (
      startDate: string,
      endDate: string
    ) => [string, string];
    processDataOutput: (startDate: string, endDate: string) => Promise<any>;
  }
> = {
  "/daily_data_in_date_range": {
    validateAndAdjustRange: validateAndAdjustDailyRange,
    processDataOutput: processDailyDataOutput,
  },
  "/monthly_data_in_date_range": {
    validateAndAdjustRange: validateAndAdjustMonthlyRange,
    processDataOutput: processMonthlyDataOutput,
  },
  "/yearly_data_in_date_range": {
    validateAndAdjustRange: validateAndAdjustYearlyRange,
    processDataOutput: processYearlyDataOutput,
  },
};

/**
 * Generic function to handle data retrieval for any granularity (daily, monthly, yearly).
 * This function dynamically handles route creation and data processing.
 *
 * @param route - The API endpoint for the requested data.
 */
function createDataRoute(route: string) {
  router.get(route, async (req: Request, res: Response): Promise<void> => {
    try {
      let startDate = req.query.start_date as string;
      let endDate = req.query.end_date as string;

      if (!routeConfig[route]) {
        res.status(400).json({ error: "Invalid route configuration" });
        return;
      }

      const { validateAndAdjustRange, processDataOutput } = routeConfig[route];

      // Validate & Adjust the date range
      const [validatedStartDate, validatedEndDate] = validateAndAdjustRange(
        startDate,
        endDate
      );

      // Process data with adjusted dates
      const responseData = await processDataOutput(
        validatedStartDate,
        validatedEndDate
      );

      res.status(200).json(responseData);
    } catch (err) {
      console.error(`Error fetching data for ${route}:`, err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

// Dynamically create routes based on route configuration
Object.keys(routeConfig).forEach(createDataRoute);

// Export the router
export default router;
