import { Button, styled } from "@mui/material";

export const DateRangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
