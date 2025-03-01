import express, { Router, Request, Response } from "express";
import {
  handlingOverviewTotalData,
  handlingOverviewChartData,
} from "../models/data_login"; // Import the Call model

const router: Router = express.Router();

// -----------------------------------------------------------------------
/**
 * This route is used to get the DAILY AI handled calls and the calls handled by human
 * in a provided time interval.
 */
router.get("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const initialDate = String(req.query.initial_date);
    const finalDate = String(req.query.final_date);

    console.log("initialDate: ", initialDate);
    const handlingOverviewTotal = await handlingOverviewTotalData({
      initialDate,
      finalDate,
    });

    const handlingOverviewDaily = await handlingOverviewChartData({
      initialDate,
      finalDate,
    });

    const loginData = {
      handlingOverviewDaily: handlingOverviewDaily,
      handlingOverviewTotal: handlingOverviewTotal,
    };

    res.status(200).json(loginData); // Respond with the retrieved calls
  } catch (err) {
    console.error("Error fetching recent calls:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------------------------------------------------------

// Export the router
export default router;
