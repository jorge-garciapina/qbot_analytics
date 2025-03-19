import { InfoOutlined } from "@mui/icons-material";
import { IconButtonChart } from "../../partials/icon_button/comp_icon_button";
import { useTranslation } from "react-i18next";

interface TitleContainerInput {
  title: string;
}

import { Box, styled } from "@mui/material";

export const StyledTitleContainer = styled(Box)(() => ({
  flexGrow: 2,
  display: "flex", // Use flexbox for layout
  alignItems: "center", // Align items vertically in the center
  backgroundColor: "rgb(255,0,0)",
  borderWidth: "5px",
  // border: "solid",
  margin: "0",
}));

import { Typography } from "@mui/material";

export const ChartTitleContainer = styled(Typography)(() => ({
  fontSize: "14px",
  color: "rgb(255,0,0)",
}));

export const TitleContainer: React.FC<TitleContainerInput> = ({ title }) => {
  const { t } = useTranslation();

  function chartInfo() {
    console.log("Appointment Information clicked");
  }

  return (
    <StyledTitleContainer>
      <ChartTitleContainer>{title}</ChartTitleContainer>
      <IconButtonChart
        icon={<InfoOutlined />}
        tooltipTitle={t("chartInformation.buttons.info")}
        onClick={chartInfo}
      />
    </StyledTitleContainer>
  );
};
