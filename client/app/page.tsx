import { ExpenseTableColumns } from "@/components/columns";
import CreateExpenseForm from "@/components/create-expense-form";
import DisplayCard from "@/components/display-card";
import { DataTable } from "@/components/ui/data-table";
import {
  getExpensesInCurrentMonth,
  getExpensesInCurrentWeek,
  getExpensesInCurrentYear,
  getExpensesToday,
  getLeastExpensesDay,
  getMostExpensesDay,
  getOverallExpenses,
  mostSpentCategory,
} from "@/lib/utils";
import { Category } from "@/types/category";
import { Expense } from "@/types/expense";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getExpenses(
  userId?: string,
  categoryId?: string
): Promise<Expense[] | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?userId=${userId}`,
        {
          method: "GET",
        }
      );
    } else if (categoryId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?categoryId=${categoryId}`,
        {
          method: "GET",
        }
      );
    } else {
      throw new Error("No userId or categoryId provided");
    }

    if (!response.ok) {
      throw new Error(
        "Error fetching expenses: " +
          response.statusText +
          " " +
          response.json()
      );
    }

    const expenses: Expense[] = await response.json();

    return expenses;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function getCategoriesByUserId(
  userId: string,
): Promise<Category[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/${userId}`,{
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching categories: " + response.statusText + " " + response.json());
    }

    const categories: Category[] = await response.json();

    return categories;
  } catch (error) {
    console.error(error);
    return;
  }
}

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const expenses = await getExpenses(session.user.id);
  const categories = await getCategoriesByUserId(session.user.id);

  if (!expenses) {
    throw new Error("Error fetching expenses");
  }

  if (!categories) {
    throw new Error("Error fetching categories");
  }

  // Map the category name to the expense
  const expensesWithCategoryName = expenses.map((expense) => {
    const category = categories.find(
      (category) => category.id === expense.categoryId
    );

    if (!category) {
      throw new Error("Error finding category");
    }

    return {
      ...expense,
      categoryName: category.name,
    };
  });

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DisplayCard
          title="Overall Expenses"
          content={(await getOverallExpenses(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title="This Year"
          content={(await getExpensesInCurrentYear(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title="This Month"
          content={(await getExpensesInCurrentMonth(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title="This Week"
          content={(await getExpensesInCurrentWeek(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title="Today"
          content={(await getExpensesToday(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title="Most Spent Category"
          content={mostSpentCategory(expensesWithCategoryName)}
        />
        <DisplayCard title="Most Spent Day" content={await getMostExpensesDay(session.user.id)} />
        <DisplayCard
          title="Least Spent Day"
          content={await getLeastExpensesDay(session.user.id)}
        />
      </div>

      <div className="grid grid-cols-2 items-center">
        <p className="text-4xl">My Expenses</p>
        <CreateExpenseForm
          buttonStyle="justify-self-end"
          categories={categories}
          session={session}
        />
      </div>
      {/* Expense Table */}
      <DataTable
        columns={ExpenseTableColumns}
        data={expensesWithCategoryName}
        enableFiltering
        filterColumnName="categoryName"
      />
    </div>
  );
}
