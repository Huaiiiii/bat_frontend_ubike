import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const DataTable = ({ data, selectedCity, selectedDistricts, stationInput }) => {
  const headCells = [
    { id: "city", label: "縣市", dataField: "sarea" },
    { id: "district", label: "區域", dataField: "sarea" },
    { id: "stationName", label: "站點名稱", dataField: "sna" },
    {
      id: "availableBikes",
      label: "可借車輛",
      dataField: "available_rent_bikes",
    },
    {
      id: "availableSpaces",
      label: "可還空位",
      dataField: "available_return_bikes",
    },
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        mt: 8,
        overflowX: { xs: "auto", md: "hidden" },
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#b5cd22" }}>
            {headCells.map((cell) => (
              <TableCell
                key={cell.id}
                align="center"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  py: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.filter(
              (item) =>
                (!selectedCity || selectedCity === "台北市") &&
                (selectedDistricts.length === 0 ||
                  selectedDistricts.includes(item.sarea)) &&
                (stationInput === "" || item.sna.includes(stationInput))
            )
            .map((item, idx) => (
              <TableRow
                key={item.sno}
                sx={{
                  backgroundColor: idx % 2 === 1 ? "#f6f6f6" : "white",
                }}
              >
                {headCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    align={cell.id === "stationName" ? "left" : "center"}
                    sx={{
                      fontSize: "1.1rem",
                      py: 3,
                      color: "#666",
                      fontWeight: cell.bold ? "bold" : "normal",
                    }}
                  >
                    {cell.id === "city" ? "台北市" : item[cell.dataField]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
