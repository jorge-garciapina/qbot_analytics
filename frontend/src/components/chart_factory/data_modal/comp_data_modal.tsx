import { ChartContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { ChartMiddleSectionContainer } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import { UpperSectionDataModal } from "./data_modal_upper_section/comp_upper_section_modal";
// import ReactECharts from "echarts-for-react";
import { ValidGranularities } from "../../../hooks";

import { HandlingOverviewDataType } from "../../../types";
import DataTable from "./table/comp_data_table";

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
  console.log("BACKEND DATA: ", backendData);
  return (
    <ChartContainer>
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
        {/* FIXME: In this place I have to put an entry-point to the table object (pending...) */}
        {/* <ReactECharts
          option={chartOptions}
          style={{ height: 400, width: "100%" }}
        /> */}
      </ChartMiddleSectionContainer>

      <DataTable backendData={backendData}/>
    </ChartContainer>
  );
};
