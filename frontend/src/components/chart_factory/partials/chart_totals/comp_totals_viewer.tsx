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
const Totals = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  // backgroundColor: "red",
  backgroundColor: theme.palette.test.main,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: "16px",
}));

const Name = styled(Typography)(({ theme }) => ({
  color: theme.palette.test.light,
  fontSize: 12,
  fontWeight: 500,
}));

const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.test.dark,
  fontSize: 12,
  fontWeight: 500,
}));
