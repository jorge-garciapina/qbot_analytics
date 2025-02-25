import { ModalChartOptions } from "../../../types/data_types";
import { ChartContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { ChartMiddleSectionContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import { UpperSectionModal } from "./upper_section/comp_upper_section_modal";
import ReactECharts from "echarts-for-react";

export const ModalChart: React.FC<ModalChartOptions> = ({
  options,
  initialDateModifier,
  endDateModifier,
  initialDate,
  endDate,
}) => {
  const { title, ...otherOptions } = options;

  return (
    <ChartContainer>
      <UpperSectionModal
        title={title.text}
        initialDateModifier={initialDateModifier}
        endDateModifier={endDateModifier}
        initialDate={initialDate}
        endDate={endDate}
      />
      <ChartMiddleSectionContainer>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartMiddleSectionContainer>
    </ChartContainer>
  );
};
