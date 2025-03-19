import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, styled } from "@mui/material";

const Icon = styled(IconButton)(() => ({
  color: "rgb(255,0,0)",
  width: "14px",
  height: "14px",
  marginLeft: "6px",
  // border: "solid",
}));

interface IconButtonChartProps {
  icon: React.ReactNode; // Accepts any React node as the icon
  tooltipTitle: string; // Tooltip title
  onClick?: () => void; // Optional click handler
}

export const IconButtonChart: React.FC<IconButtonChartProps> = ({
  icon,
  tooltipTitle,
  onClick,
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <Icon color="primary" onClick={onClick}>
        {icon}
      </Icon>
    </Tooltip>
  );
};
