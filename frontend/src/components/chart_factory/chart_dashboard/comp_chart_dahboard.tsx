import { ChartContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { UpperSectionDashboardChart } from "./upper_section/comp_upper_section_dashboard";
import { BottomSection } from "./bottom_section/comp_bottom_section";
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
  footerSummaryInTimeInterval?: FooterSummaryTotalsType;
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
    <ChartContainer>
      <UpperSectionDashboardChart title={title.text} openModal={openModal} />
      <ChartMiddleSectionContainer>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartMiddleSectionContainer>
      <BottomSection footerSummaryInTimeInterval={totalsDummy} />
    </ChartContainer>
  );
};
