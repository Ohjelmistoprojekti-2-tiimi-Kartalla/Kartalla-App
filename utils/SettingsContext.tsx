import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SettingsContextType = {
  distance: number;
  setDistance: (value: number) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  distance: 100,
  setDistance: () => { },
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [distance, setDistanceState] = useState<number>(100);

  // Load saved distacance when the app starts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("distanceSetting");
        if (stored !== null) {
          setDistanceState(Number(stored));
        }
      } catch (error) {
        console.warn("Asetusten lataaminen epäonnistui:", error);
      }
    };
    loadSettings();
  }, []);

  // Save when value changes
  const setDistance = async (value: number) => {
    try {
      setDistanceState(value);
      await AsyncStorage.setItem("distanceSetting", String(value));
    } catch (error) {
      console.warn("Asetusten tallentaminen epäonnistui:", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ distance, setDistance }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
