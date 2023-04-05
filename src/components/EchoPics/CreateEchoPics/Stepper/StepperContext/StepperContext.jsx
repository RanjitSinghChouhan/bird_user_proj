import { createContext, useContext, useState } from "react";

const StepperContext = createContext({ echoPicsData: "", setEchoPicsData: null });

export function UseContextProvider({ children }) {
  const [echoPicsData, setEchoPicsData] = useState("");
  return (
    <StepperContext.Provider value={{ echoPicsData, setEchoPicsData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { echoPicsData, setEchoPicsData } = useContext(StepperContext);

  return { echoPicsData, setEchoPicsData };
}