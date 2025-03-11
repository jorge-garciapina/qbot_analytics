import { StyledChartDashboardContainer } from "./styled_chart_dashboard_container";
import { UpperSectionDashboardChart } from "./upper_section/comp_upper_section_dashboard";
import { ChartTotals } from "../chart_totals/comp_chart_totals";
import { ChartMiddleSectionContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
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
      <ChartMiddleSectionContainer>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartMiddleSectionContainer>
      <ChartTotals footerSummaryInTimeInterval={totalsDummy} />
    </StyledChartDashboardContainer>
  );
};
