import { ChartMiddleSectionContainer } from "../partials/chart_container/styled_chart_container";
import { UpperSectionDataModal } from "./data_modal_upper_section/comp_upper_section_modal";
// import ReactECharts from "echarts-for-react";
import { ValidGranularities } from "../../../common/types";

import { HandlingOverviewDataType } from "../../charts/handling_overview/types/types_handling_overview";
import DataTable from "./table/comp_data_table";

import { StyledDataModalContainer } from "./styled_data_modal_container";

interface DataModalInput {
  backendData: HandlingOverviewDataType | undefined;
  initialDate: string;
  endDate: string;
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  granularityModifier: (newGranularity: ValidGranularities) => void;
}

export const DataModal: React.FC<DataModalInput> = ({
  backendData,
  initialDate,
  endDate,
  initialDateModifier,
  endDateModifier,
  granularityModifier,
}) => {
  return (
    <StyledDataModalContainer>
      <UpperSectionDataModal
        title={"DATA MODAL"}
        // title={title.text}
        initialDateModifier={initialDateModifier}
        endDateModifier={endDateModifier}
        granularityModifier={granularityModifier}
        initialDate={initialDate}
        endDate={endDate}
      />
      <ChartMiddleSectionContainer>
        <DataTable backendData={backendData} />
      </ChartMiddleSectionContainer>
    </StyledDataModalContainer>
  );
};
