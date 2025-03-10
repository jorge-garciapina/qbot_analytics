export interface DashboardChartInput {
  initialDate: string;
  endDate: string;
  refreshTrigger: number;
}

//--------------CHART TYPES--------------

export interface TitleType {
  text: string;
  left: string;
  triggerEvent: boolean;
}

export interface ToolTipType {
  trigger: string;
  axisPointer: { type: string };
}

export interface AxisTextStyleType {
  color: string;
  fontWeight: string;
  fontSize: number;
}

export interface XAxisType {
  data: string[];
  name?: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: {
    color: string;
    fontWeight: string;
    fontSize: number;
  };
}

export interface YAxisType {
  name: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: AxisTextStyleType;
}

export interface LegendType {
  orient: string;
  right: string;
  bottom: number;
  textStyle: {
    color: string;
    fontSize: number;
  };
}

type BarCharDataType = number[];
type PieCharDataType = { value: number; name: string }[];

interface BaseSeries {
  name: string;
  type: string;
  data: BarCharDataType | PieCharDataType;
}

interface BarSeries extends BaseSeries {
  stack?: string; // Optional for bar charts
}

interface LineSeries extends BaseSeries {
  type: "line";
}

interface PieSeries extends BaseSeries {
  type: "pie";
  radius?: string; // Optional property for pie charts
}

export type SeriesItem = BarSeries | LineSeries | PieSeries;

export type ChartOptions = {
  title: TitleType;
  tooltip: ToolTipType;
  legend: LegendType;
  xAxis?: XAxisType;
  yAxis?: YAxisType;
  series: SeriesItem[];
};

interface ChartTotal {
  name: string;
  value: number;
}

export type FooterSummaryTotalsType = ChartTotal[];

export interface ModalChartInput {
  options: ChartOptions;
  initialDate: string;
  endDate: string;
}

export interface DashboardChartProps {
  options: ChartOptions;
  footerSummaryInTimeInterval?: FooterSummaryTotalsType;
  openModal: () => void;
}

export interface UpperSectionInput {
  title: string;
  openModal: () => void;
}

export interface ActionToolbarInput {
  openModal: () => void;
}
