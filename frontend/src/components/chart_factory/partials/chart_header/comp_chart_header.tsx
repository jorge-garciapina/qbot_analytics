import { Typography } from "@mui/material";

interface Input {
  title: string;
}

export const ChartHeader: React.FC<Input> = ({ title }) => {
  return (
    <>
      <Typography variant="modalChartTitle">{title}</Typography>
    </>
  );
};

//////////////////////////////////////////////////////////////
