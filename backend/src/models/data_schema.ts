import { Schema } from "mongoose";

import { CallReason, CallStatus, EscalationReasons } from "../types/data_types";

const callReasons: ReadonlyArray<CallReason> = [
  "scheduling",
  "rescheduling",
  "cancellation",
];
const validStatus: ReadonlyArray<CallStatus> = ["scheduled", "transferred"];
const escalationReasons: ReadonlyArray<EscalationReasons> = [
  "none",
  "dob_mismatch",
  "first_name_mismatch",
  "last_name_mismatch",
];

// Define the schema
export const callSchema: Schema = new Schema({
  callId: {
    type: String,
    required: true,
    immutable: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    immutable: true,
  },
  startTime: {
    type: Date,
    required: true,
    immutable: true,
  },
  endTime: {
    type: Date,
    required: true,
    immutable: true,
  },
  reason: {
    type: String,
    required: true,
    enum: callReasons,
    immutable: true,
  },
  status: {
    type: String,
    required: true,
    enum: validStatus,
    immutable: true,
  },
  failure_reason: {
    type: String,
    required: true,
    enum: escalationReasons,
    immutable: true,
  },
});
