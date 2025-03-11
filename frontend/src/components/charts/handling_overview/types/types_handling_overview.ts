export interface HandlingOverviewDataType {
  xAxis: string[];
  year: number;
  callsHandledByHuman: number[];
  callsHandledByAI: number[];
}

export type ValidQueryKeys =
  | "yearly_data_in_date_range"
  | "monthly_data_in_date_range"
  | "daily_data_in_date_range";
