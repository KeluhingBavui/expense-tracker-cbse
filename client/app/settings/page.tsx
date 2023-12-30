import React from "react";
import { axios } from "@/lib/axios";
import Currency from "@/components/settings/Currency";
import CurrenciesList from "@/components/settings/CurrenciesList";

const fetchSettings = async () => {
  const { data } = await axios.get(`/settings`, {
    params: {
      // todo: send the user id to all requests (meybe in a middleware)
      userId: "d94a860f-b66f-46e2-aa29-4c918dd5c848",
    },
  });
  return data;
};

const SettingsPage = async () => {
  const settings = await fetchSettings();
  console.log(settings);
  return (
    <div>
      <h1> Settings Page</h1>
      <Currency currency={settings.currency} />
      <CurrenciesList />
    </div>
  );
};

export default SettingsPage;
