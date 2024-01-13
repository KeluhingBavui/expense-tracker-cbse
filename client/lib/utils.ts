import { Expense } from "@/types/expense";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getOverallExpenses(userId: string): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/overall?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching overall expenses: " + response.statusText + " " + response.json());
    }

    const overallExpenses: number = await response.json();

    return overallExpenses;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching overall expenses: " + error);
  }
}

export async function getExpensesInCurrentYear(userId: string): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/current-year?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching expenses in current year: " + response.statusText + " " + response.json());
    }

    const expensesInCurrentYear: number = await response.json();

    return expensesInCurrentYear;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching expenses in current year: " + error);
  }
}

export async function getExpensesInCurrentMonth(userId: string): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/current-month?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching expenses in current month: " + response.statusText + " " + response.json());
    }

    const expensesInCurrentMonth: number = await response.json();

    return expensesInCurrentMonth;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching expenses in current month: " + error);
  }
}

export async function getExpensesInCurrentWeek(userId: string): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/current-week?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching expenses in current week: " + response.statusText + " " + response.json());
    }

    const expensesInCurrentWeek: number = await response.json();

    return expensesInCurrentWeek;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching expenses in current week: " + error);
  }
}

export async function getExpensesToday(userId: string): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/today?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching expenses today: " + response.statusText + " " + response.json());
    }

    const expensesToday: number = await response.json();

    return expensesToday;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching expenses today: " + error);
  }
}

/**
 * Returns the category with the most expenses
 * @param expenses - array of expenses with category name
 * @returns string
 */
export function mostSpentCategory(
  expenses: {
    id: string;
    date: string;
    expense: number;
    categoryId: string;
    comments: string;
    userId: string;
    categoryName: string;
  }[]
) {
  if (expenses.length === 0) return "No expenses yet";

  const categories = expenses.map((expense) => expense.categoryName);
  const uniqueCategories = [...new Set(categories)];
  const categoryExpenses = uniqueCategories.map((category) => {
    return {
      category,
      expense: expenses
        .filter((expense) => expense.categoryName === category)
        .reduce((acc, expense) => acc + expense.expense, 0),
    };
  });
  const sortedCategoryExpenses = categoryExpenses.toSorted(
    (a, b) => b.expense - a.expense
  );
  return sortedCategoryExpenses[0].category;
}

export async function getMostExpensesDay(userId: string): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/most-day?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching most expenses day: " + response.statusText + " " + response.json());
    }

    const mostExpensesDay: any = await response.json();

    return mostExpensesDay.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching most expenses day: " + error);
  }
}

export async function getLeastExpensesDay(userId: string): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses/least-day?userId=${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching least expenses day: " + response.statusText + " " + response.json());
    }

    const leastExpensesDay: any = await response.json();

    return leastExpensesDay.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching least expenses day: " + error);
  }
}
