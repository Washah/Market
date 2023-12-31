import React from "react";
import { getOverbookedDates } from "../api/orderApi";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Box } from "@mui/material";

// This component provides a date picker for selecting the delivery date, with overbooked dates disabled.
const OrderDatePicker = ({ value, onChange, error, helperText }: any) => {
  // State to store overbooked dates
  const [overbookedDates, setOverbookedDates] = React.useState<string[]>([]);

  // This effect fetches the overbooked dates from the API when the component mounts.
  React.useEffect(() => {
    const fetchOverbookedDates = async () => {
      try {
        const dates = await getOverbookedDates();
        // Convert date objects to "YYYY-MM-DD" format strings and set them to the state.
        setOverbookedDates(
          dates.map((date: Date) => new Date(date).toISOString().split("T")[0])
        );
      } catch (error) {
        console.error("Error fetching overbooked dates:", error);
      }
    };
    fetchOverbookedDates();
  }, []);

  // Check if a given date is overbooked.
  const isDateOverbooked = (dateString: string): boolean => {
    return overbookedDates.includes(dayjs(dateString).format("YYYY-MM-DD"));
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1.5rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="Delivery Date">
          <MobileDatePicker
            disablePast
            shouldDisableDate={isDateOverbooked}
            value={value}
            onChange={onChange}
            sx={
              error
                ? {
                    border: "1.6px solid rgb(211, 47, 47)",
                    borderRadius: "0.3rem",
                  }
                : {}
            }
          />
          {error && (
            <div
              style={{
                color: "rgb(211, 47, 47)",
                fontSize: "0.8rem",
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: "0.9rem",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              {helperText}
            </div>
          )}
        </DemoItem>
      </LocalizationProvider>
    </Box>
  );
};

export default OrderDatePicker;
