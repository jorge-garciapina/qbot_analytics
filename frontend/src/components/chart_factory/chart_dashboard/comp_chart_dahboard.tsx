import { StyledChartDashboardContainer } from "./styled_chart_dashboard_container";
import { UpperSectionDashboardChart } from "./upper_section/comp_upper_section_dashboard";
import { ChartTotals } from "../partials/chart_totals/comp_chart_totals";
import { ChartContainer } from "../partials/chart_container/comp_chart_container";
import ReactECharts from "echarts-for-react";
import {
  // DashboardChartProps,
  ChartOptions,
  FooterSummaryTotalsType,
} from "../../../types/data_types";

import { ModalNames } from "../../modals/comp_modal_container";
interface DashboardChartProps {
  options: ChartOptions;
  footerSummaryInTimeInterval: FooterSummaryTotalsType;
  openModal: (selectedModal: ModalNames) => void;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  options,
  footerSummaryInTimeInterval,
  openModal,
}) => {
  const { title, ...otherOptions } = options;

  const totalsDummy = footerSummaryInTimeInterval || [
    {
      name: "",
      value: 0,
    },
  ];

  return (
    <StyledChartDashboardContainer>
      <UpperSectionDashboardChart title={title.text} openModal={openModal} />
      <ChartContainer>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartContainer>
      <ChartTotals footerSummaryInTimeInterval={totalsDummy} />
    </StyledChartDashboardContainer>
  );
};
