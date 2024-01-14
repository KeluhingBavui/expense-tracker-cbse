"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";
import { useUserSession } from "@/hooks/useUserSession";
import { axios, getClientUserSession } from "@/lib/axios";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const Field = ({ currency }: { currency: string }) => {
  const { setData } = useCurrenciesStore();
  const { session } = useUserSession();
  return (
    <div>
      <Label className="text-md">Currency</Label>
      <div className="w-full max-w-sm ">
        <Input value={currency} readOnly />
      </div>
      <Button
        className="w-full max-w-sm mt-2"
        size="sm"
        onClick={async () => {
          const {
            data: { data },
          } = await axios.get("/currency/rates", {
            params: { userId: session?.user.id },
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

export default Field;
