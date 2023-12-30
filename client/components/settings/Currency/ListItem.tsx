"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { axios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import { useCurrenciesStore } from "@/hooks/useCurrenciesStore";

interface Props {
  code: string;
  rate: number;
}

const ListItem = ({ code, rate }: Props) => {
  const router = useRouter();
  const { session } = useUserSession();
  const { setData } = useCurrenciesStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer p-2 rounded-lg hover:bg-background duration-500 flex gap-2">
          {code} - <span className="font-bold">{rate.toFixed(4)}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md ">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to change your currency to {code}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will update all your expenses, loans and savings to the
            new currency.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await axios.put(
                "/currency/convert",
                {
                  rate: rate,
                  currency: code,
                },
                {
                  params: { userId: session?.user.id },
                }
              );
              router.refresh();
              setData([]);
            }}
          >
            Convert
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ListItem;
