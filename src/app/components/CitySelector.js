"use client";
import React, { useState } from "react";
import { cityList } from "../constants/cityList";
import { Autocomplete, TextField } from "@mui/material";

const CitySelector = ({ selectedCity, setSelectedCity }) => {
  const [cityInput, setCityInput] = useState("");

  return (
    <Autocomplete
      disablePortal
      disableClearable
      options={cityList}
      value={selectedCity}
      size="small"
      onChange={(e, newValue) => {
        setSelectedCity(newValue || "");
      }}
      inputValue={cityInput}
      onInputChange={(e, newInputValue) => {
        setCityInput(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="選擇縣市"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#f6f6f6",
              borderRadius: 2,
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      )}
      sx={{ width: { xs: "100%", sm: 250 } }}
      slotProps={{
        paper: {
          sx: {
            marginTop: 1,
            backgroundColor: "#f6f6f6",
          },
        },
      }}
    />
  );
};

export default CitySelector;
