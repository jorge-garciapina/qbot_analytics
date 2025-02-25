import { ChartTitleContainer } from "../../../../mui_configurations/styled_components/typography/styled_chart_title";
import { TitleStyledContainer } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_title_container";

import { InfoOutlined } from "@mui/icons-material";
import { IconButtonChart } from "./comp_icon_button";
import { useTranslation } from "react-i18next";

interface TitleContainerInput {
  title: string;
}

export const TitleContainer: React.FC<TitleContainerInput> = ({ title }) => {
  const { t } = useTranslation();

  function chartInfo() {
    console.log("Appointment Information clicked");
  }

  return (
    <TitleStyledContainer>
      <ChartTitleContainer>{title}</ChartTitleContainer>
      <IconButtonChart
        icon={<InfoOutlined />}
        tooltipTitle={t("chartInformation.buttons.info")}
        onClick={chartInfo}
      />
    </TitleStyledContainer>
  );
};
