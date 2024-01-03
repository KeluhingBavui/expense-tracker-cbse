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
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditExpenseForm from "./edit-expense-form";
import { Loan } from "@/types/loan";
import EditSavingForm from "./edit-saving-form";
import { Saving } from "@/types/saving";
import EditLoanForm from "./edit-loan-form";

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
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
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
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?id=${expense.id}`,
            {
              method: "DELETE",
            }
          );

          if (!res.ok) {
            throw new Error("Internal Server Error");
          }

          alert("Expense deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Error deleting expense");
        }
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
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
                <Button variant="ghost" onClick={handleDelete}>
                  Delete Expense
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Edit Expense</DialogTitle>
            <EditExpenseForm expense={expense} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const LoanTableColumns: ColumnDef<Loan>[] = [
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
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "person",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Person
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const loan = row.original;

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this loan?")) return;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/loans?id=${loan.id}`,
            {
              method: "DELETE",
            }
          );

          if (!res.ok) {
            throw new Error("Internal Server Error");
          }

          alert("Loan deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Error deleting loan");
        }
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <Button variant="ghost">Edit</Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={handleDelete}>
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Edit Loan</DialogTitle>
            <EditLoanForm loan={loan} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const SavingTableColumns: ColumnDef<Saving>[] = [
  {
    accessorKey: "purpose",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purpose
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "target_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target Date
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "target_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Target Amount
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "saving_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saving Amount
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "to_save_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To Save
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("to_save_amount"));
      if (amount < 0) {
        return <span className="text-green-500">Completed</span>;
      } else {
        return <span>{String(amount)}</span>;
      }
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const saving = row.original;

      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this saving?")) return;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/savings?id=${saving.id}`,
            {
              method: "DELETE",
            }
          );

          if (!res.ok) {
            throw new Error("Internal Server Error");
          }

          alert("Saving deleted successfully");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("Error deleting saving");
        }
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <Button variant="ghost">Edit Saving</Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" onClick={handleDelete}>
                  Delete Saving
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogTitle>Edit Saving</DialogTitle>
            <EditSavingForm saving={saving} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
