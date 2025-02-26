export interface AggregatedData {
  status: string;
  countsByMonth: Record<string, number>;
}

export interface HandlingOverviewMonthlyData {
  months: string[];
  scheduledCallsByMonth: number[];
  transferredCallsByMonth: number[];
  year: number;
}

export interface DateRangeType {
  startDate: string;
  endDate: string;
}
