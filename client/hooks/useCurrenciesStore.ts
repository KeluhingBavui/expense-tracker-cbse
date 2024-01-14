import { create } from "zustand";
import { Currency } from "@/types/settings";
interface CurrencyData {
  data: Currency[];
  setData: (data: Currency[]) => void;
}

export const useCurrenciesStore = create<CurrencyData>((set) => ({
  data: [],
  setData: (data) => set(() => ({ data })),
}));
