import express from "express";
import dataGeneration from "./route_data_generation";
import calls from "./route_login";
import handlingOverview from "./route_handling_overview";

const router = express.Router();

router.use("/data_generation", dataGeneration);
router.use("/calls", calls);
router.use("/handling_overview", handlingOverview);

export default router;
