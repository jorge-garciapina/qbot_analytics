import { Box, Typography, styled } from "@mui/material";

interface TotalsViewerInput {
  name: string;
  value: number;
}
export const TotalsViewer: React.FC<TotalsViewerInput> = ({ name, value }) => {
  return (
    <Totals>
      <Name variant="h5">{name}: </Name>
      <Value variant="h5">{value.toFixed(2)}</Value>
    </Totals>
  );
};

// STYLED COMPONENTS:
const Totals = styled(Box)(() => ({
  flexGrow: 1,
  // backgroundColor: "red",
  backgroundColor: "rgb(255,0,0)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: "16px",
}));

const Name = styled(Typography)(() => ({
  color: "rgb(255,0,0)",
  fontSize: 12,
  fontWeight: 500,
}));

const Value = styled(Typography)(() => ({
  color: "rgb(255,0,0)",
  fontSize: 12,
  fontWeight: 500,
}));
