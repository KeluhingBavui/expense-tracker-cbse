"use client";

import { Expense } from "@/types/expense";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Category } from "@/types/category";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type EditExpenseFormProps = {
    expense: {
        id: string;
        date: string;
        expense: number;
        categoryId: string;
        comments: string;
        userId: string;
        categoryName: string;
    };
}

async function getCategoriesByUserId(userId: string): Promise<Category[] | undefined> {
    try {
        //TODO: Update this function to return the categories from the API when it's ready
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/v1/categories?userId=${userId}`,{
        //     method: "GET",
        //   }
        // );

        // if (!response.ok) {
        //   throw new Error("Error fetching categories: " + response.statusText + " " + response.json());
        // }

        // const categories: Category[] = await response.json();

        const categories: Category[] = [
            {
                id: "67837a47-f8ff-45cf-8599-096692d09e0b",
                name: "Food",
                userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
            },
            {
                id: "add890ad-dda6-4c49-b4db-3a6390b85c5d",
                name: "Automobile",
                userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
            },
            {
                id: "ac244bd6-8f33-430b-a6b1-5d4184729f1a",
                name: "Entertainment",
                userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
            },
        ];

        return categories;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function updateExpense(expense: Expense, router: AppRouterInstance): Promise<Expense> {
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
            });
        
        if (!response.ok) {
            console.error(response);
            throw new Error("Error updating expense: ");
        }

        await response.json();
        router.refresh();
        alert("Expense updated successfully");
        return expense;
    } catch (error) {
        throw new Error("Error updating expense: " + error);
    }
}

const EditExpenseForm: React.FC<EditExpenseFormProps> = (props) => {
    const router = useRouter();

    // Convert the date string to a Date object
    const date = new Date(props.expense.date);

    // Create a new Expense object with the date as a Date object
    const expense = {
        ...props.expense,
        date: date,
    }

    const [expenseForm, setExpenseForm] = useState(expense);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getCategories() {
            const categories = await getCategoriesByUserId(expenseForm.userId);
            if (categories) {
                setCategories(categories);
            }
        }

        getCategories();
    }, [expenseForm.userId]);

    const handleSubmit = async () => {
        const reqBody: Expense = {
            id: expenseForm.id,
            date: format(expenseForm.date, "yyyy-MM-dd"),
            expense: expenseForm.expense,
            categoryId: expenseForm.categoryId,
            comments: expenseForm.comments,
            userId: expenseForm.userId,
        }

        await updateExpense(reqBody, router);
    }

    return (
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
                            selected={expenseForm.date}
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
                    defaultValue={expenseForm.expense}
                    type="number"
                    className="col-span-3"
                    onChange={(e) => setExpenseForm((prev) => ({ ...prev, expense: Number(e.target.value) }))}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expense-category" className="text-right">
                    Category
                </Label>
                <Select
                    defaultValue={expenseForm.categoryId}
                    onValueChange={(value) =>
                        setExpenseForm((prev) => ({ ...prev, categoryId: value }))
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
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
                    defaultValue={expenseForm.comments}
                    className="col-span-3"
                    onChange={(e) => setExpenseForm((prev) => ({ ...prev, comments: e.target.value }))}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4 flex justify-center">
                    <Button variant="default" onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default EditExpenseForm;
