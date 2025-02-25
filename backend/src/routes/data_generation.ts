import express, { Router, Request, Response } from "express";
import { saveYearlyRecords } from "../models/data_generation";
import { generateCallRecords } from "../data_logic/generateDataInDB";

const router: Router = express.Router();

router.post("/generate_data", async (req: Request, res: Response) => {
  const { year, numberOfEntries } = req.body;

  try {
    const records = await generateCallRecords(
      Number(year),
      Number(numberOfEntries)
    );

    const schemaName = `calls_${year}`; // Dynamically create the collection name

    await saveYearlyRecords({
      schemaName,
      records,
    });

    res.status(200).json({
      message: `Successfully generated ${records.length} records for the year ${year}.`,
    });
  } catch (error) {
    console.error("Error generating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
