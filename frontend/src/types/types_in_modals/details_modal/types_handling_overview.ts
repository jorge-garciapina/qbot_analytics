export interface HandlingOverviewMonthlyDataType {
  months: string[];
  year: number;
  scheduledCallsByMonth: number[];
  transferredCallsByMonth: number[];
}

export type ValidQueryKeys =
  | "multiple_year_data"
  | "monthly_data_in_date_range"
  | "weekly_data_in_date_range"
  | "daily_data_in_date_range"
  | "hourly_data_in_date_range";
