import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

type NumberInputProps = {
  quantity: number;
  onValueChange: (value: number) => void;
  onQuantityChange?: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  onValueChange,
  quantity,
  onQuantityChange,
}) => {
  // Handler to increase the quantity value
  const handleIncrease = () => {
    const newValue = quantity < 99 ? quantity + 1 : quantity;
    onValueChange(newValue);
    if (onQuantityChange) onQuantityChange(newValue);
  };

  // Handler to decrease the quantity value
  const handleDecrease = () => {
    const newValue = quantity > 1 ? quantity - 1 : quantity;
    onValueChange(newValue);
    if (onQuantityChange) onQuantityChange(newValue);
  };

  return (
    <div className="numberInput">
      <IconButton
        sx={{ color: "rgb(70,23,155)" }}
        aria-label="decrease product"
        onClick={handleDecrease}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        id="productQuantity"
        type="number"
        value={quantity}
        inputProps={{ min: 1, max: 99 }}
        sx={{
          "& input": {
            height: "0.2rem",
            width: "1.1rem",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield",
            textAlign: "center",
          },
        }}
      />
      <IconButton
        sx={{ color: "rgb(70,23,155)" }}
        aria-label="increase product"
        onClick={handleIncrease}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default NumberInput;
