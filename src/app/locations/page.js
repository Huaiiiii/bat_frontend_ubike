"use client";
import React, { useEffect, useState } from "react";
import CitySelector from "@/components/CitySelector";
import StationSearch from "@/components/StationSearch";
import { getTPEYoubikeData } from "../api/actions/youbike";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import DataTable from "@/app/components/DataTable";

const Location = () => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [stationInput, setStationInput] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [allDistrictChecked, setAllDistrictChecked] = useState(true);
  const tpeDistrictsOptions = Array.from(
    new Set(data.map((item) => item.sarea))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTPEYoubikeData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCity !== "台北市") {
      setSelectedDistricts([]);
      setAllDistrictChecked(false);
    } else if (selectedCity === "台北市") {
      setSelectedDistricts(tpeDistrictsOptions);
      setAllDistrictChecked(true);
    }
  }, [selectedCity]);

  // 行政區全選/全不選
  const handleAllDistrictChange = (checked) => {
    setAllDistrictChecked(checked);
    setSelectedDistricts(checked ? tpeDistrictsOptions : []);
  };

  const handleDistrictChange = (district) => {
    let updatedDistricts;
    if (selectedDistricts.includes(district)) {
      updatedDistricts = selectedDistricts.filter((d) => d !== district);
    } else {
      updatedDistricts = [...selectedDistricts, district];
    }
    setSelectedDistricts(updatedDistricts);
    setAllDistrictChecked(
      updatedDistricts.length === tpeDistrictsOptions.length
    );
  };

  return (
    <div className="py-8 w-full 100vh">
      <h1 className="text-2xl font-bold mb-4 text-[#b2cc3a]">站點資訊</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center">
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <CitySelector
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
            <StationSearch
              data={data}
              selectedStation={selectedStation}
              setSelectedStation={setSelectedStation}
              setSelectedCity={setSelectedCity}
              stationInput={stationInput}
              setStationInput={setStationInput}
            />
          </div>
          {selectedCity === "台北市" && (
            <div className="mt-4">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                <label className="flex items-center space-x-2 col-span-full">
                  <Checkbox
                    checked={allDistrictChecked}
                    onChange={(e) => handleAllDistrictChange(e.target.checked)}
                    sx={{
                      "&.Mui-checked": {
                        color: "#b5cd22",
                      },
                    }}
                  />
                  <span>全部勾選</span>
                </label>
                {tpeDistrictsOptions.map((district) => (
                  <label key={district} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedDistricts.includes(district)}
                      onChange={() => handleDistrictChange(district)}
                      sx={{
                        "&.Mui-checked": {
                          color: "#b5cd22",
                        },
                      }}
                    />
                    <span>{district}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full hidden md:flex justify-center items-center">
          <Image
            src="/image.png"
            alt=""
            width={800}
            height={400}
            className="mt-6 w-full h-auto object-contain"
          />
        </div>
      </div>
      <DataTable
        data={data}
        selectedCity={selectedCity}
        selectedDistricts={selectedDistricts}
        stationInput={stationInput}
      />
    </div>
  );
};

export default Location;
