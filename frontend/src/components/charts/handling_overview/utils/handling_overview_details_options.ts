import { HandlingOverviewDataType } from "../types/types_handling_overview";

export function handlingOverviewDetailsOptions({
  fetchedData,
  yAxisName,
  title,
}: InputType): ChartOptions {
  if (!fetchedData) {
    return {
      grid: { top: "5%", bottom: "50px", left: "15%", right: "15%" },
      title: generateChartTitle(title),
      tooltip: generateToolTip(),
      legend: generateLegend(),
      xAxis: generateXAxis({ data: [] }),
      yAxis: generateYAxis(yAxisName),
      series: [],
    };
  }

  const { xAxis, year, callsHandledByHuman, callsHandledByAI } = fetchedData;

  const seriesData: SeriesItem[] = [
    {
      name: "Calls Handled By Human",
      type: "bar",
      stack: `${year}`,
      data: callsHandledByHuman || [],
      itemStyle: {
        color: generateGradient("rgb(55,219,255)", "rgb(49,193,225)"),
      },
    },
    {
      name: "Calls Handled By AI",
      type: "bar",
      stack: `${year}`,
      data: callsHandledByAI || [],
      itemStyle: {
        color: generateGradient("rgb(81,114,233)", "rgb(71,100,205)"),
      },
    },
  ];

  return {
    grid: { top: "5%", bottom: "50px", left: "15%", right: "15%" },
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({ data: xAxis }),
    yAxis: generateYAxis(yAxisName),
    series: seriesData,
  };
}

/////////////////////////////////////////////////////////////////////////////////////////
/** UTILITIES: BELOW IT IS POSSIBLE TO FIND THE TYPES AND UTILITY FUNCTIONS NEEDED FOR THE
 * FUNCTION ABOVE
 */
// TYPES
export type ChartOptions = {
  grid: Grid;
  title: TitleType;
  tooltip: ToolTipType;
  legend: LegendType;
  xAxis?: XAxisType;
  yAxis?: YAxisType;
  series: SeriesItem[];
};

interface InputType {
  fetchedData: HandlingOverviewDataType | undefined;
  yAxisName: string;
  title: string;
}

interface SeriesItem {
  name: string;
  type: string;
  data: number[];
  itemStyle?: {
    color?: {
      type: "linear";
      x: number;
      y: number;
      x2: number;
      y2: number;
      colorStops: { offset: number; color: string }[];
    };
  };
  stack?: string; // Optional for bar charts
}

interface AxisTextStyleType {
  color: string;
  fontWeight: string;
  fontSize: number;
  fontFamily?: string;
}

interface AxisLabelType {
  color: string;
  fontSize: number;
  fontWeight?: string;
  fontFamily?: string;
}

interface AxisLineType {
  show: boolean;
  lineStyle: {
    color: string;
    width: number;
  };
}

interface Grid {
  top: string;
  bottom: string;
  left: string;
  right: string;
}
interface TitleType {
  text: string;
  left: string;
  triggerEvent: boolean;
}
interface ToolTipType {
  trigger: string;
  axisPointer: { type: string };
}
interface LegendType {
  orient: string;
  left: string;
  bottom: string;
  textStyle: AxisTextStyleType;
}
interface XAxisType {
  data: string[];
  name?: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: AxisTextStyleType;
  axisLabel: AxisLabelType;
  axisLine: AxisLineType;
}
interface YAxisType {
  name: string;
  type: string;
  nameLocation: string;
  nameGap: number;
  nameTextStyle: AxisTextStyleType;
  axisLabel: AxisLabelType;
  axisLine: AxisLineType;
  splitLine: {
    show: boolean;
    lineStyle: {
      type: string;
      color: string;
      width: number;
    };
  };
}

// UTILITY:
/**
 * Generates a horizontal gradient color for bar charts.
 * @param leftColor - The color on the left side of the bar.
 * @param rightColor - The color on the right side of the bar.
 * @returns Gradient color object for ECharts.
 */
const generateGradient = (leftColor: string, rightColor: string) => ({
  type: "linear" as const,
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    { offset: 0, color: leftColor },
    { offset: 0.4, color: leftColor },
    { offset: 0.6, color: rightColor },
    { offset: 1, color: rightColor },
  ],
});

function generateChartTitle(title: string): TitleType {
  return {
    text: title,
    left: "center",
    triggerEvent: true, // Enables event triggering for the title
  };
}

function generateToolTip(): ToolTipType {
  return { trigger: "axis", axisPointer: { type: "shadow" } };
}

function axisTextStyle(): AxisTextStyleType {
  return {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Instrument Sans",
  };
}

function generateXAxis({
  data,
  name,
}: {
  data: string[];
  name?: string;
}): XAxisType {
  return {
    data,
    name: name || "",
    type: "category",
    nameLocation: "center",
    nameGap: 50,
    nameTextStyle: axisTextStyle(),
    axisLabel: {
      color: "rgb(127,139,155)",
      fontSize: 10,
      fontWeight: "bold",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgb(233,238,245)",
        width: 1,
      },
    },
  };
}

function generateYAxis(name: string): YAxisType {
  return {
    name,
    type: "value",
    nameLocation: "center",
    nameGap: 50,
    nameTextStyle: axisTextStyle(),
    axisLabel: {
      color: "rgb(127,139,155)",
      fontSize: 10,
      fontFamily: "Instrument Sans",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgb(233,238,245)",
        width: 1,
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "rgb(233,238,245)",
        width: 1,
      },
    },
  };
}

function generateLegend(): LegendType {
  return {
    orient: "horizontal",
    left: "center",
    bottom: "0%",
    textStyle: {
      color: "#333",
      fontSize: 12,
      fontWeight: "",
    },
  };
}
