import { TextField, MenuItem, Box, InputLabelProps } from "@mui/material";
import { Controller, UseFormRegisterReturn } from "react-hook-form";
import { capitalizeWords } from "../utils/capitalizeWords";

interface FormInputProps {
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  label: string;
  error: boolean;
  type: string;
  helperText: string | undefined;
  selectOptions?: string[]; // array of select options
  InputLabelProps?: Partial<InputLabelProps>;
}

// reusable form input component
const FormInput: React.FC<FormInputProps> = ({
  register,
  name,
  label,
  error,
  type,
  helperText,
  selectOptions,
  InputLabelProps,
  control,
}) => {
  // If it's a select type input
  if (type === "select" && selectOptions) {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            select
            fullWidth
            error={error}
            helperText={helperText}
            InputLabelProps={InputLabelProps}
            sx={{ mb: "1.5rem" }}
          >
            {selectOptions.map((option: any, index: number) => (
              <MenuItem
                key={typeof option === "object" ? option._id : index}
                value={typeof option === "object" ? option._id : option}
              >
                {typeof option === "object"
                  ? option.categoryName
                  : capitalizeWords(option)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    );
  }

  // If it's a file or date type input
  if (type === "file" || type === "date") {
    return (
      <Box sx={{ marginBottom: "1.5rem" }}>
        <label htmlFor={name}>{label}</label>
        <TextField
          {...register}
          type={type}
          name={name}
          variant="outlined"
          fullWidth
          error={error}
          helperText={helperText}
        />
      </Box>
    );
  }

  // If it's not a select type input
  return (
    <TextField
      {...register}
      name={name}
      type={type}
      label={label}
      variant="outlined"
      InputLabelProps={InputLabelProps}
      fullWidth
      error={error}
      helperText={helperText}
      inputProps={{ step: "0.01" }}
      sx={{ marginBottom: "1.5rem" }}
    />
  );
};

export default FormInput;
