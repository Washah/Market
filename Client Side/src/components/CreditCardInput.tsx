import { useState, ChangeEvent, FocusEvent } from "react";
import Cards from "react-credit-cards-2";
import { TextField, Grid, Box } from "@mui/material";
import "../../node_modules/react-credit-cards-2/dist/es/styles-compiled.css";

interface CardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
}

type Focused = "number" | "expiry" | "cvc" | "name";

const CreditCardInput = ({
  onChange,
  value,
  error,
  helperText,
}: {
  onChange: (value: string) => void;
  value: string;
  error: boolean;
  helperText?: string;
}) => {
  // Local state for holding card details
  const [state, setState] = useState<CardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "number",
  });

  // Handle changes to input fields
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  // Handle input focus events
  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, focus: evt.target.name as Focused }));
  };

  // Handle card number changes and call the external onChange function
  const handleInputChangeModified = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState(prev => ({ ...prev, [name]: value }));
    if (name === "number") onChange(value);
  };

  return (
    <Grid container sx={{ mt: -2, mb: 2 }}>
      <Grid item xs={6}>
        <Box marginBottom={2}>
          <TextField
            type="text"
            name="name"
            label="Full Name"
            variant="outlined"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            sx={{ width: "45%", mr: 2 }}
          />
          <TextField
            type="number"
            name="number"
            label="Card Number"
            variant="outlined"
            value={value}
            onChange={handleInputChangeModified}
            onFocus={handleInputFocus}
            error={error}
            helperText={helperText}
            sx={{ width: "45%" }}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            type="text"
            name="expiry"
            label="Expiration Date"
            variant="outlined"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            sx={{ width: "45%", mr: 2, mt: 3 }}
          />
          <TextField
            type="number"
            name="cvc"
            label="CVC"
            variant="outlined"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            sx={{ width: "45%", mt: 3 }}
          />
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </Grid>
    </Grid>
  );
};

export default CreditCardInput;
