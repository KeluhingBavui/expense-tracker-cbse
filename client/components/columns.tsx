"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditExpenseForm from "./edit-expense-form";

type Expense = {
  id: string;
  date: string;
  expense: number;
  categoryId: string;
  comments: string;
  userId: string;
  categoryName: string;
};

export const ExpenseTableColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "expense",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expense
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const expense = row.original;

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this expense?")) return;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?id=${expense.id}`, {
            method: "DELETE",
          });
  
          if (!res.ok) {
            throw new Error("Internal Server Error");
          }

          alert("Expense deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Error deleting expense");
        }
      }

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <Button variant="ghost">Edit Expense</Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={handleDelete}>Delete Expense</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Edit Expense</DialogTitle>
            <EditExpenseForm expense={expense} />
          </DialogContent>
        </Dialog>
      );
    }
  }
]
