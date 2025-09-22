import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const StationSearch = ({
  data,
  selectedStation,
  setSelectedStation,
  setSelectedCity,
  stationInput,
  setStationInput,
}) => {
  const tpeStationsOptions = Array.from(new Set(data.map((item) => item.sna)));

  return (
    <Autocomplete
      disableClearable
      freeSolo
      fullWidth
      options={tpeStationsOptions}
      value={selectedStation}
      size="small"
      onChange={(_, newValue) => {
        setSelectedStation(newValue);
        setSelectedCity("");
      }}
      inputValue={stationInput}
      onInputChange={(_, newInputValue) => {
        setStationInput(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="選擇站點"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <SearchIcon sx={{ color: "#acacac", mr: 1 }} />
                {params.InputProps.endAdornment}
              </>
            ),
          }}
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
      slotProps={{
        paper: {
          sx: {
            marginTop: 1,
            backgroundColor: "#f6f6f6",
          },
        },
        option: {
          sx: {
            backgroundColor: "#f6f6f6",
            color: "#444",
            fontWeight: "normal",
            fontSize: "1.25rem",
            minHeight: 48,
            display: "flex",
            alignItems: "center",
            "&[aria-selected='true']": {
              color: "#b2cc3a",
              fontWeight: "bold",
            },
            "&:hover": {
              backgroundColor: "#ececec",
            },
          },
        },
      }}
    />
  );
};

export default StationSearch;
