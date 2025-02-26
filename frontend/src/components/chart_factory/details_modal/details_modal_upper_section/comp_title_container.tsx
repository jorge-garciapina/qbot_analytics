import { ChartTitleContainerChartTitle_Container } from "../../../../mui_configurations/ChartTitleContainercomponents/typography/ChartTitleContainerchart_title";
import { ChartTitleContainerTitleStyledContainer_Container } from "../../../../mui_configurations/ChartTitleContainercomponents/chart_sections/upper_section/ChartTitleContainertitle_container";
import { InfoOutlined } from "@mui/icons-material";
import { IconButtonChart } from "./comp_icon_button";
interface TitleContainerInput {
  title: string;
}

export const TitleContainer: React.FC<TitleContainerInput> = ({ title }) => {
  function chartInfo() {
    console.log("Appointment Information clicked");
  }
  return (
    <ChartTitleContainerTitleStyledContainer_Container>
      <ChartTitleContainerChartTitle_Container>
        {title}
      </ChartTitleContainerChartTitle_Container>
      <IconButtonChart
        icon={<InfoOutlined />}
        tooltipTitle="Open In new"
        onClick={chartInfo}
      />
    </ChartTitleContainerTitleStyledContainer_Container>
  );
};
