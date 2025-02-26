interface HandlingOverviewDaily {
  chartKeys: string[];
  callsHandledByAI: number[];
  callsHandledByAIPercentage: number[];

  callsHandledByHuman: number[];
  callsHandledByHumanPercentage: number[];
}

interface HandlingOverviewTotal {
  total: number;
  handledByAI: number;
  handledByHuman: number;
  handledByAIPercentage: number;
  handledByHumanPercentage: number;
}

interface AverageDurationDaily {
  callsHandledByAIAverageDuration: number[];
  callsHandledByHumanAverageDuration: number[];
  callsHandledByAIPercentage: number;
  callsHandledByHumanPercentage: number;
  chartKeys: string[];
}

interface PeakTimes {
  hourOfTheDay: string[];
  callsHandledByHuman: number[];
  callsHandledByAI: number[];
  peakHour: number;
  peakVolume: number;
  total: number[];
}

export interface FetchedDataType {
  handlingOverviewDaily: HandlingOverviewDaily;
  handlingOverviewTotal: HandlingOverviewTotal;
  averageDurationDaily: AverageDurationDaily;
  peakTimes: PeakTimes;
}
