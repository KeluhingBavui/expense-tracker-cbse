"use client";

import { Saving } from "@/types/saving";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useFetchCategories from "@/hooks/useFetchCategories";

type EditSavingFormProps = {
  saving: {
    id: string;
    target_date: string;
    target_amount: number;
    saving_amount: number;
    purpose: string;
    comment: string;
    userId: string;
  };
};

async function updateSaving(saving: Saving): Promise<Saving> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/savings`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saving),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error updating saving: ");
    }

    await response.json();
    alert("Saving updated successfully");
    return saving;
  } catch (error) {
    throw new Error("Error updating saving: " + error);
  }
}

const EditSavingForm: React.FC<EditSavingFormProps> = (props) => {
  const router = useRouter();

  // Convert the date string to a Date object
  const date = new Date(props.saving.target_date);

  // Create a new Expense object with the date as a Date object
  const saving = {
    ...props.saving,
    target_date: date,
  };

  const [savingForm, setSavingForm] = useState(saving);

  const handleSubmit = async () => {
    const reqBody: Saving = {
      id: savingForm.id,
      target_date: format(savingForm.target_date, "yyyy-MM-dd"),
      target_amount: savingForm.target_amount,
      saving_amount: savingForm.saving_amount,
      purpose: savingForm.purpose,
      comment: savingForm.comment,
      to_save_amount: 0,
      userId: savingForm.userId,
    };

    await updateSaving(reqBody);
    router.refresh();
  };

  return (
    <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="saving-purpose" className="text-right">
          Purpose
        </Label>
        <Input
          id="saving-purpose"
          defaultValue={savingForm.purpose}
          type="text"
          className="col-span-3"
          onChange={(e) =>
            setSavingForm((prev) => ({
              ...prev,
              purpose: String(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="expense-date" className="text-right">
          Date
        </Label>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !savingForm.target_date && "text-muted-foreground"
              )}
            >
              {savingForm.target_date ? (
                format(savingForm.target_date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={savingForm.target_date}
              onSelect={(date) => {
                if (!date) return;
                setSavingForm((prev) => ({ ...prev, target_date: date }));
              }}
              initialFocus
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="saving-target-amount" className="text-right">
          Target Amount
        </Label>
        <Input
          id="saving-target-amount"
          defaultValue={savingForm.target_amount}
          type="number"
          className="col-span-3"
          onChange={(e) =>
            setSavingForm((prev) => ({
              ...prev,
              target_amount: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="saving-amount" className="text-right">
          Saving Amount
        </Label>
        <Input
          id="saving-amount"
          defaultValue={savingForm.saving_amount}
          type="number"
          className="col-span-3"
          onChange={(e) =>
            setSavingForm((prev) => ({
              ...prev,
              saving_amount: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <Label htmlFor="saving-comment" className="text-right">
          Comments
        </Label>
        <Textarea
          id="saving-comment"
          defaultValue={savingForm.comment}
          className="col-span-3"
          onChange={(e) =>
            setSavingForm((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
      </div>
      <div className="grid items-center grid-cols-4 gap-4">
        <div className="flex justify-center col-span-4">
          <Button variant="default" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSavingForm;
