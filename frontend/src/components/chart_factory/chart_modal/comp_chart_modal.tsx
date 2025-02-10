import { ModalChartOptions } from "../../../types/data_types";
import { STYLED_Chart_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { UpperSectionModal } from "./upper_section/comp_upper_section_modal";
import { STYLED_ChartMiddleSection_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import ReactECharts from "echarts-for-react";

export const ModalChart: React.FC<ModalChartOptions> = ({ options }) => {
  const { title, ...otherOptions } = options;

  return (
    <STYLED_Chart_Container>
      <UpperSectionModal title={title.text} />
      <STYLED_ChartMiddleSection_Container>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </STYLED_ChartMiddleSection_Container>
    </STYLED_Chart_Container>
  );
};
