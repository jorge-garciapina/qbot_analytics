import mongoose, { Model } from "mongoose";
import { callSchema } from "./data_schema";

import { RawCallRecord } from "../dataTypes";

export async function saveYearlyRecords({
  schemaName,
  records,
}: {
  schemaName: string;
  records: RawCallRecord[];
}) {
  const DynamicCallModel: Model<RawCallRecord> = mongoose.model<RawCallRecord>(
    schemaName,
    callSchema
  );

  await DynamicCallModel.insertMany(records); // Save all records to the specified collection
}
