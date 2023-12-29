import { Expense } from "@/types/expense";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the overall expenses
 * @param expenses - array of expenses
 * @returns number
 */
export function overallExpenses(expenses: Expense[]) {
  return expenses.reduce((acc, expense) => acc + expense.expense, 0);
}

/**
 * Returns the overall expenses in the current year
 * @param expenses - array of expenses
 * @returns number
 */
export function expensesInCurrentYear(expenses: Expense[]) {
  const currentYear = new Date().getFullYear();
  return expenses
    .filter((expense) => new Date(expense.date).getFullYear() === currentYear)
    .reduce((acc, expense) => acc + expense.expense, 0);
}

/**
 * Returns the overall expenses in the current month
 * @param expenses - array of expenses
 * @returns number
 */
export function expensesInCurrentMonth(expenses: Expense[]) {
  const currentMonth = new Date().getMonth();
  return expenses
    .filter((expense) => new Date(expense.date).getMonth() === currentMonth)
    .reduce((acc, expense) => acc + expense.expense, 0);
}

/**
 * Returns the overall expenses in the current week
 * @param expenses - array of expenses
 * @returns number
 */
export function expensesInCurrentWeek(expenses: Expense[]) {
  const today = new Date();
  const currentWeek = today.getDate() - today.getDay();
  return expenses
    .filter((expense) => new Date(expense.date).getDate() >= currentWeek)
    .reduce((acc, expense) => acc + expense.expense, 0);
}

/**
 * Returns the overall expenses in the current day
 * @param expenses - array of expenses
 * @returns number
 */
export function expensesToday(expenses: Expense[]) {
  const today = new Date().toISOString().split("T")[0];
  return expenses
    .filter((expense) => expense.date === today)
    .reduce((acc, expense) => acc + expense.expense, 0);
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
  const sortedCategoryExpenses = categoryExpenses?.toSorted(
    (a, b) => b.expense - a.expense
  );
  return sortedCategoryExpenses[0].category;
}

/**
 * Returns the day with the most expenses (e.g Monday, Tuesday, etc.)
 * @param expenses - array of expenses
 * @returns string
 */
export function mostSpentDay(expenses: Expense[]) {
  const days = expenses.map((expense) => new Date(expense.date).getDay());
  const uniqueDays = [...new Set(days)];
  const dayExpenses = uniqueDays.map((day) => {
    return {
      day,
      expense: expenses
        .filter((expense) => new Date(expense.date).getDay() === day)
        .reduce((acc, expense) => acc + expense.expense, 0),
    };
  });
  const sortedDayExpenses = dayExpenses.toSorted(
    (a, b) => b.expense - a.expense
  );
  return getDayName(sortedDayExpenses[0].day);
}

/**
 * Returns the day name from the day number
 * @param day - day number
 * @returns string
 */
export function getDayName(day: number) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

/**
 * Returns the category with the least expenses
 * @param expenses - array of expenses
 * @returns string
 */
export function leastSpentDay(expenses: Expense[]) {
  const days = expenses.map((expense) => new Date(expense.date).getDay());
  const uniqueDays = [...new Set(days)];
  const dayExpenses = uniqueDays.map((day) => {
    return {
      day,
      expense: expenses
        .filter((expense) => new Date(expense.date).getDay() === day)
        .reduce((acc, expense) => acc + expense.expense, 0),
    };
  });
  const sortedDayExpenses = dayExpenses.toSorted(
    (a, b) => a.expense - b.expense
  );
  return getDayName(sortedDayExpenses[0].day);
}
