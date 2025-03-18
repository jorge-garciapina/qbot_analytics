import { UpperSectionDashboardChart } from "./upper_section/comp_upper_section_dashboard";
import { ChartContainer, ChartTotals } from "../partials";
import ReactECharts from "echarts-for-react";
import { Box, styled } from "@mui/material";

import { ChartOptions } from "../../charts/handling_overview/utils/handling_overview_details_options";

import { ModalNames } from "../../modals/comp_modal_container";

interface ChartTotal {
  name: string;
  value: number;
}
interface DashboardChartProps {
  options: ChartOptions;
  footerSummaryInTimeInterval: ChartTotal[];
  openModal: (selectedModal: ModalNames) => void;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  options,
  footerSummaryInTimeInterval,
  openModal,
}) => {
  const { title, ...otherOptions } = options;

  const totals = footerSummaryInTimeInterval || [
    {
      name: "",
      value: 0,
    },
  ];

  return (
    <Chart>
      <UpperSectionDashboardChart title={title.text} openModal={openModal} />
      <ChartContainer>
        <ReactECharts
          option={otherOptions}
          // style={{ height: "100%", width: "100%" }}
          style={{ height: "217px", width: "100%" }}
        />
      </ChartContainer>
      <ChartTotals footerSummaryInTimeInterval={totals} />
    </Chart>
  );
};

// STYLED COMPONENT
export const Chart = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.test.main,
  borderWidth: "5px",
  border: "solid",
  borderColor: theme.palette.test.chartBorder,
  borderRadius: "12px",
  padding: "3px 12px 0px 19px",
  width: "586px",
  height: "297px",
  display: "flex",
  flexDirection: "column",
}));
