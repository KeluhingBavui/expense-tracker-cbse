export type Currency = {
  code: string;
  rate: number;
};

export type Settings = {
  language: string;
  font: string;
  theme: string;
  emailEnbld: boolean;
  webEnbld: boolean;
  notifTypes: string[];
  currency: string;
};
