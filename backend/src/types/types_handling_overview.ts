export interface AggregatedData {
  status: string;
  countsByMonth: Record<string, number>;
}

export interface HandlingOverviewMonthlyData {
  xAxis: string[];
  callsHandledByHuman: number[];
  callsHandledByAI: number[];
  year: number;
}

export interface DateRangeType {
  startDate: string;
  endDate: string;
}
