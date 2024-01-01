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
import { Saving } from "@/types/saving";
import { Category } from "@/types/category";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

type CreateSavingFormProps = {
  buttonStyle: string;
  session: Session;
};

async function createSaving(saving: Saving): Promise<Saving> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/savings`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saving),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error creating saving: ");
    }

    await response.json();
    alert("Saving created successfully");
    return saving;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating saving: " + error);
  }
}

const CreateSavingForm: React.FC<CreateSavingFormProps> = (props) => {
  const router = useRouter();
  const [savingForm, setSavingForm] = useState({
    id: "",
    target_date: new Date(),
    target_amount: 0,
    saving_amount: 0,
    to_save_amount: 0,
    purpose: "",
    comment: "",
    userId: props.session.user.id,
  });

  const handleSubmit = async () => {
    const reqBody: Saving = {
      id: savingForm.id,
      target_date: format(savingForm.target_date, "yyyy-MM-dd"),
      target_amount: savingForm.target_amount,
      saving_amount: savingForm.saving_amount,
      to_save_amount: savingForm.to_save_amount,
      purpose: savingForm.purpose,
      comment: savingForm.comment,
      userId: savingForm.userId,
    };

    await createSaving(reqBody);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={props.buttonStyle}>Add Saving</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Saving</DialogTitle>
        <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="saving-purpose" className="text-right">
              Purpose
            </Label>
            <Input
              id="saving-purpose"
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
            <Label htmlFor="saving-date" className="text-right">
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
                  onSelect={(date) => {
                    if (!date) return;
                    setSavingForm((prev) => ({ ...prev, target_date: date }));
                  }}
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
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
            <Label htmlFor="expense-comments" className="text-right">
              Comment
            </Label>
            <Textarea
              id="expense-comments"
              className="col-span-3"
              onChange={(e) =>
                setSavingForm((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateSavingForm;
