import { ChartOptions } from "../../../types/data_types";
import { ValidGranularities } from "../../../hooks";
import { ChartContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { ChartMiddleSectionContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import { UpperSectionModal } from "./details_modal_upper_section/comp_upper_section_modal";
import ReactECharts from "echarts-for-react";

interface DetailsModalInput {
  options: ChartOptions;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
  initialDate: string;
  endDate: string;
}

export const DetailsModal: React.FC<DetailsModalInput> = ({
  options,
  initialDateModifier,
  endDateModifier,
  granularityModifier,
  initialDate,
  endDate,
}) => {
  const { title, ...chartOptions } = options;

  return (
    <ChartContainer>
      <UpperSectionModal
        title={title.text}
        initialDateModifier={initialDateModifier}
        endDateModifier={endDateModifier}
        granularityModifier={granularityModifier}
        initialDate={initialDate}
        endDate={endDate}
      />
      <ChartMiddleSectionContainer>
        <ReactECharts
          option={chartOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartMiddleSectionContainer>
    </ChartContainer>
  );
};
