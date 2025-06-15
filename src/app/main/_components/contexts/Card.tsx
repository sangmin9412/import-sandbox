"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CardInitialData } from "@/lib/api/cards";
import { DEFAULT_CARD_FILTER_OPTIONS } from "@/config";

type Option<T extends string | number> = {
  label: string;
  value: T;
};

interface CardContextType {
  filter: {
    region?: string;
    year?: number;
  };
  filterOptions: {
    region: Array<Option<string>>;
    year: Array<Option<number>>;
  };
  handleFilter: (key: string, value: string | number) => void;
  initialData: CardInitialData["initialData"];
  initialFilter: CardInitialData["initialFilter"];
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({
  children,
  initialData,
  initialFilter
}: {
  children: React.ReactNode;
  initialData: CardInitialData["initialData"];
  initialFilter: CardInitialData["initialFilter"];
}) => {
  const [filter, setFilter] = useState<{ region?: string; year?: number }>(initialFilter);

  const filterOptions = useMemo(() => {
    return {
      region: DEFAULT_CARD_FILTER_OPTIONS.region,
      year: DEFAULT_CARD_FILTER_OPTIONS.year
    };
  }, []);

  const handleFilter = useCallback((key: string, value: string | number) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <CardContext.Provider value={{ filter, filterOptions, handleFilter, initialData, initialFilter }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};
