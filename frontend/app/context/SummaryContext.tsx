// context/SummaryContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SummaryContextType = {
  summaryData: any;
  setSummaryData: (data: any) => void;
};

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
  const [summaryData, setSummaryData] = useState<any>(null);
  return (
    <SummaryContext.Provider value={{ summaryData, setSummaryData }}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (!context) throw new Error("useSummary must be used inside SummaryProvider");
  return context;
};
