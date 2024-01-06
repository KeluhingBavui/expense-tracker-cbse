import { create } from 'zustand';
interface LocaleData {
  data: string;
  setData: (data: string) => void;
}

export const useLocaleStore = create<LocaleData>((set) => ({
  data: 'en',
  setData: (data) => set(() => ({ data })),
}));
