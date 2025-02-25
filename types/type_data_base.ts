export type CallReason = "scheduling" | "rescheduling" | "cancellation";
export type CallStatus = "scheduled" | "transferred";
export type EscalationReasons =
  | "none"
  | "dob_mismatch"
  | "first_name_mismatch"
  | "last_name_mismatch";

export type FailureReasons =
  | "dob_mismatch"
  | "first_name_mismatch"
  | "last_name_mismatch";

export interface RawCallRecord {
  callId: string;
  phoneNumber: string;
  startTime: Date;
  endTime: Date;
  reason: CallReason;
  status: CallStatus;
  failure_reason: EscalationReasons;
}
