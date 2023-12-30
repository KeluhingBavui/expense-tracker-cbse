"use client";

import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import React from "react";
import { Button } from "../ui/button";
import { axios } from "@/lib/axios";

const CurrenciesList = () => {
  const { data } = useCurrenciesStore();
  const [numberToShow, setNumberToShow] = React.useState(5);
  return (
    data.length > 0 && (
      <div>
        <h3>Currency List</h3>
        <ul className="flex flex-col gap-2">
          {data.slice(0, numberToShow).map((currency) => (
            <li
              className="bg-gray-700 cursor-pointer p-4 rounded-lg hover:bg-gray-400 duration-300"
              key={currency.code}
              onClick={() => {
                axios.put(
                  "/currency/convert",
                  {
                    rate: currency.rate,
                    currency: currency.code,
                  },
                  {
                    params: {
                      userId: "d94a860f-b66f-46e2-aa29-4c918dd5c848",
                    },
                  }
                );
              }}
            >
              {currency.code} - {currency.rate}
            </li>
          ))}
        </ul>
        <div className="flex gap-5">
          {numberToShow < data.length && (
            <Button onClick={() => setNumberToShow(numberToShow + 5)}>
              Show More
            </Button>
          )}
          {numberToShow > 5 && (
            <Button onClick={() => setNumberToShow(numberToShow - 5)}>
              Show Less
            </Button>
          )}
        </div>
      </div>
    )
  );
};

export default CurrenciesList;
