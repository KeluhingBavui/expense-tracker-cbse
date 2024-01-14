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
import { Expense } from "@/types/expense";
import { Category } from "@/types/category";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

type CreateExpenseFormProps = {
  buttonStyle: string;
  categories: Category[];
  session: Session;
};

async function createExpense(expense: Expense): Promise<Expense> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      }
    );

    if (!response.ok) {
      console.error(response);
      throw new Error("Error creating expense: ");
    }

    await response.json();
    alert("Expense created successfully");
    return expense;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating expense: " + error);
  }
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = (props) => {
  const router = useRouter();
  const [expenseForm, setExpenseForm] = useState({
    id: "",
    date: new Date(),
    expense: 0,
    categoryId: "",
    comments: "",
    userId: props.session.user.id,
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const reqBody: Expense = {
      id: expenseForm.id,
      date: format(expenseForm.date, "yyyy-MM-dd"),
      expense: expenseForm.expense,
      categoryId: expenseForm.categoryId,
      comments: expenseForm.comments,
      userId: expenseForm.userId,
    };

    await createExpense(reqBody).then(() => {
      setOpen(false);
    });
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={props.buttonStyle}>Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Expense</DialogTitle>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !expenseForm.date && "text-muted-foreground"
                  )}
                >
                  {expenseForm.date ? (
                    format(expenseForm.date, "PPP")
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
                    setExpenseForm((prev) => ({ ...prev, date: date }));
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
            <Label htmlFor="expense-amount" className="text-right">
              Expense
            </Label>
            <Input
              id="expense-amount"
              type="number"
              className="col-span-3"
              onChange={(e) =>
                setExpenseForm((prev) => ({
                  ...prev,
                  expense: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-category" className="text-right">
              Category
            </Label>
            <Select
              onValueChange={(value) =>
                setExpenseForm((prev) => ({ ...prev, categoryId: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {props.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-comments" className="text-right">
              Comments
            </Label>
            <Textarea
              id="expense-comments"
              className="col-span-3"
              onChange={(e) =>
                setExpenseForm((prev) => ({
                  ...prev,
                  comments: e.target.value,
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

export default CreateExpenseForm;
