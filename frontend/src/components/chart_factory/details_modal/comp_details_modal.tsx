import { HandlingOverviewDataType } from "../../charts/handling_overview/types/types_handling_overview";
import { ValidGranularities } from "../../../hooks";
import { UpperSectionModal } from "./details_modal_upper_section/comp_upper_section_modal";
import ReactECharts from "echarts-for-react";

import { handlingOverviewDetailsOptions } from "../../charts/handling_overview/utils/handling_overview_details_options";
import { StyledDetailsModalContainer } from "./styled_details_modal_container";
import { FooterSummaryTotalsType } from "../../../types/data_types";
import { ChartTotals } from "../partials/chart_totals/comp_chart_totals";

import { ChartContainer } from "../partials/chart_container/comp_chart_container";

interface DetailsModalInput {
  backendData: HandlingOverviewDataType | undefined;
  title: string;
  xAxisName: string;
  yAxisName: string;
  initialDate: string;
  endDate: string;
  footerSummaryInTimeInterval: FooterSummaryTotalsType;
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
  footerSummaryInTimeInterval,
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
