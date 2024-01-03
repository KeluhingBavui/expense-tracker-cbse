import { Loan } from "@/types/loan";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import types from "next/types";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type EditLoanFormProps = {
  loan: Loan;
};

async function updateLoan(loan: Loan): Promise<Loan> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/loans`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loan),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error updating loan: ");
    }

    await response.json();
    alert("Loan updated successfully");
    return loan;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating loan: " + error);
  }
}

const EditLoanForm: React.FC<EditLoanFormProps> = (props) => {
  const router = useRouter();

  // Convert the date string to a Date object
  const date = new Date(props.loan.date);

  // Create a new Expense object with the date as a Date object
  const loan = {
    ...props.loan,
    date: date,
  };

  const [loanForm, setLoanForm] = useState(loan);
  const types = ["Taken", "Given"];
  const statuses = ["Pending", "Settled"];

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

    await updateLoan(reqBody);
    router.refresh();
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        {/* Date */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-date">Date</Label>
          <Input
            type="date"
            id="loan-date"
            className="col-span-3"
            value={format(loanForm.date, "yyyy-MM-dd")}
            onChange={(e) =>
              setLoanForm({ ...loanForm, date: new Date(e.target.value) })
            }
          />
        </div>
        {/* Amount */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-amount">Amount</Label>
          <Input
            type="number"
            id="loan-amount"
            className="col-span-3"
            value={loanForm.amount}
            onChange={(e) =>
              setLoanForm({ ...loanForm, amount: Number(e.target.value) })
            }
          />
        </div>
        {/* Type */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-type">Type</Label>
          <Select
            defaultValue={loanForm.type}
            onValueChange={(value) =>
              setLoanForm((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Person */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-person">Person</Label>
          <Input
            id="loan-person"
            className="col-span-3"
            value={loanForm.person}
            onChange={(e) =>
              setLoanForm({ ...loanForm, person: e.target.value })
            }
          />
        </div>
        {/* Status */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-status">Status</Label>
          <Select
            defaultValue={loanForm.status}
            onValueChange={(value) =>
              setLoanForm((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Reason */}
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="loan-reason">Reason</Label>
          <Textarea
            id="saving-comment"
            defaultValue={loanForm.reason}
            className="col-span-3"
            onChange={(e) =>
              setLoanForm((prev) => ({ ...prev, comment: e.target.value }))
            }
          />
        </div>
        {/* Save */}
        <div className="grid items-center grid-cols-4 gap-4">
          <div className="flex justify-center col-span-4">
            <Button variant="default" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLoanForm;
