import { HandlingOverviewDataType } from "../../charts/handling_overview/types/types_handling_overview";
import { ValidGranularities } from "../../../hooks";
import { UpperSectionModal } from "./details_modal_upper_section/comp_upper_section_modal";
import ReactECharts from "echarts-for-react";

import { handlingOverviewDetailsOptions } from "../../charts/handling_overview/utils/handling_overview_details_options";
import { StyledDetailsModalContainer } from "./styled_details_modal_container";

import { ChartContainer, ChartTotals } from "../partials";
interface ChartTotal {
  name: string;
  value: number;
}

interface DetailsModalInput {
  backendData: HandlingOverviewDataType | undefined;
  title: string;
  yAxisName: string;
  initialDate: string;
  endDate: string;
  footerSummaryInTimeInterval: ChartTotal[];
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
}

export const DetailsModal: React.FC<DetailsModalInput> = ({
  backendData,
  initialDate,
  endDate,
  title,
  yAxisName,
  footerSummaryInTimeInterval,
  initialDateModifier,
  endDateModifier,
  granularityModifier,
}) => {
  const options = handlingOverviewDetailsOptions({
    fetchedData: backendData || undefined,
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
      <ChartContainer>
        <ReactECharts
          option={chartOptions}
          style={{ height: 400, width: "100%" }}
        />
      </ChartContainer>
      <ChartTotals footerSummaryInTimeInterval={footerSummaryInTimeInterval} />
    </StyledDetailsModalContainer>
  );
};
