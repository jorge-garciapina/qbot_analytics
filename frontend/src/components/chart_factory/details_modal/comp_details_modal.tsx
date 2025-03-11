import { HandlingOverviewDataType } from "../../../types";
import { ValidGranularities } from "../../../hooks";
import { ChartMiddleSectionContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import { UpperSectionModal } from "./details_modal_upper_section/comp_upper_section_modal";
import ReactECharts from "echarts-for-react";

import { handlingOverviewDetailsOptions } from "../../charts/handling_overview/handling_overview_details_options";
import { StyledDetailsModalContainer } from "./styled_details_modal_container";

interface DetailsModalInput {
  backendData: HandlingOverviewDataType | undefined;
  title: string;
  xAxisName: string;
  yAxisName: string;
  initialDate: string;
  endDate: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
}

export const DetailsModal: React.FC<DetailsModalInput> = ({
  backendData,
  initialDate,
  endDate,
  title,
  xAxisName,
  yAxisName,
  initialDateModifier,
  endDateModifier,
  granularityModifier,
}) => {
  const options = handlingOverviewDetailsOptions({
    fetchedData: backendData || undefined,
    xAxisName,
    yAxisName,
    title,
  });
  const { title: optionsTitle, ...chartOptions } = options;

  return (
    <StyledDetailsModalContainer>
      <UpperSectionModal
        title={optionsTitle.text}
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
    </StyledDetailsModalContainer>
  );
};
