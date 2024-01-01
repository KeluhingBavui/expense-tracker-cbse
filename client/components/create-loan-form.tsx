"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Loan } from "@/types/loan";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

type CreateExpenseFormProps = {
  buttonStyle: string;
  types: string[];
  statuses: string[];
  session: Session;
};

async function createLoan(loan: Loan): Promise<Loan> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/loans`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error creating loan: ");
    }

    await response.json();
    alert("Loan created successfully");
    return loan;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating loan: " + error);
  }
}

const CreateLoanForm: React.FC<CreateExpenseFormProps> = (props) => {
  const router = useRouter();
  const [loanForm, setLoanForm] = useState({
    id: "",
    date: new Date(),
    amount: 0,
    type: "",
    person: "",
    status: "",
    reason: "",
    userId: props.session.user.id,
  });

  const handleSubmit = async () => {
    const reqBody: Loan = {
      id: loanForm.id,
      date: format(loanForm.date, "yyyy-MM-dd"),
      amount: loanForm.amount,
      type: loanForm.type,
      person: loanForm.person,
      status: loanForm.status,
      reason: loanForm.reason,
      userId: loanForm.userId,
    };

    await createLoan(reqBody);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={props.buttonStyle}>Add Loan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Loan</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !loanForm.date && "text-muted-foreground"
                  )}
                >
                  {loanForm.date ? (
                    format(loanForm.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  onSelect={(date) => {
                    if (!date) return;
                    setLoanForm((prev) => ({ ...prev, date: date }));
                  }}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-amount" className="text-right">
              Amount
            </Label>
            <Input
              id="expense-amount"
              type="number"
              className="col-span-3"
              onChange={(e) =>
                setLoanForm((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-type" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) =>
                setLoanForm((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {props.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-person" className="text-right">
              Person
            </Label>
            <Input
              className="w-max"
              placeholder="Bob"
              onChange={(e) =>
                setLoanForm((prev) => ({ ...prev, person: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-status" className="text-right">
              Status
            </Label>
            <Select
              onValueChange={(value) =>
                setLoanForm((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="w-max">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {props.statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loan-reason" className="text-right">
              Reason
            </Label>
            <Textarea
              id="expense-comments"
              className="col-span-3"
              onChange={(e) =>
                setLoanForm((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4 flex justify-center">
              <Button variant="default" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLoanForm;
