"use client";

import React from "react";
import { Button } from "../ui/button";
import { axios } from "@/lib/axios";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";

const Currency = ({ currency }: { currency: string }) => {
  const { setData } = useCurrenciesStore();
  return (
    <div className="flex items-center gap-5">
      <div className="text-2xl font-bold">{currency}</div>
      <Button
        onClick={async () => {
          const {
            data: { data },
          } = await axios.get("/currency/rates", {
            params: {
              userId: "d94a860f-b66f-46e2-aa29-4c918dd5c848",
            },
          });
          const currencies = [];
          for (const currency in data) {
            if (data.hasOwnProperty(currency)) {
              currencies.push({
                code: currency,
                rate: data[currency],
              });
            }
          }
          setData(currencies);
        }}
      >
        Change
      </Button>
    </div>
  );
};

export default Currency;
