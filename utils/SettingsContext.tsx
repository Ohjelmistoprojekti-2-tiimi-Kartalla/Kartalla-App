import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RouteLengthFilter = {
  id: string;
  label: string;
  minKm: number;
  maxKm: number;
} | null;

type SettingsContextType = {
  distance: number;
  setDistance: (value: number) => void;
  routeLengthFilter: RouteLengthFilter;
  setRouteLengthFilter: (filter: RouteLengthFilter) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  distance: 100,
  setDistance: () => { },
  routeLengthFilter: null,
  setRouteLengthFilter: () => { },
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [distance, setDistanceState] = useState<number>(100);
  const [routeLengthFilter, setRouteLengthFilterState] = useState<RouteLengthFilter>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedDistance = await AsyncStorage.getItem("distanceSetting");
        const storedFilter = await AsyncStorage.getItem("routeLengthFilter");
        if (storedDistance) setDistanceState(Number(storedDistance));
        if (storedFilter) setRouteLengthFilterState(JSON.parse(storedFilter));
      } catch (error) {
        console.warn("Asetusten lataaminen epäonnistui:", error);
      }
    };
    loadSettings();
  }, []);

  const setDistance = async (value: number) => {
    setDistanceState(value);
    await AsyncStorage.setItem("distanceSetting", String(value));
  };

  const setRouteLengthFilter = async (filter: RouteLengthFilter) => {
    setRouteLengthFilterState(filter);
    if (filter) {
      await AsyncStorage.setItem("routeLengthFilter", JSON.stringify(filter));
    } else {
      await AsyncStorage.removeItem("routeLengthFilter");
    }
  };

  return (
    <SettingsContext.Provider value={{ distance, setDistance, routeLengthFilter, setRouteLengthFilter }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
