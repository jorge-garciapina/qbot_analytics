import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { useState } from "react";

export const DropDownMenuChart: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // ✅ Explicitly define type

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedOption(event.target.value as string); // ✅ Type assertion to fix the error
  };

  return (
    <Form sx={{}} fullWidth>
      {/* TODO: This is provisional */}
      <InputLabelStyled id="dropdown-label">Total</InputLabelStyled>
      <SelectStyled
        labelId="dropdown-label"
        value={selectedOption}
        onChange={handleChange} // ✅ Error is now fixed
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </SelectStyled>
    </Form>
  );
};

// STYLED COMPONENTS
const Form = styled(FormControl)(() => ({
  height: "28px",
  width: "116px",
  // bord
}));

const InputLabelStyled = styled(InputLabel)(() => ({
  marginTop: "-12px",
  marginLeft: "-8px",
  color: "rgb(255,0,0)",
  fontSize: "14px",
}));

const SelectStyled = styled(Select)(() => ({
  height: "28px",
  width: "120px",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "solid",
    borderColor: "rgb(213,222, 234)",
    borderWidth: "1px",
  },
}));
