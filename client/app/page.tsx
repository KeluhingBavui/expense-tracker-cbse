import { ExpenseTableColumns } from "@/components/columns";
import DisplayCard from "@/components/display-card";
import { DataTable } from "@/components/ui/data-table";
import { expensesInCurrentMonth, expensesInCurrentWeek, expensesInCurrentYear, expensesToday, leastSpentDay, mostSpentCategory, mostSpentDay, overallExpenses } from "@/lib/utils";
import { Category } from "@/types/category";
import { Expense } from "@/types/expense";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getExpenses(userId?: string, categoryId?: string): Promise<Expense[] | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?userId=${userId}`,{
          method: "GET",
        }
      );
    } else if (categoryId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?categoryId=${categoryId}`,{
          method: "GET",
        }
      );
    } else {
      throw new Error("No userId or categoryId provided");
    }
  
    if (!response.ok) {
      throw new Error("Error fetching expenses: " + response.statusText + " " + response.json());
    }
  
    const expenses: Expense[] = await response.json();

    return expenses;
  } catch (error) {
    console.error(error);
    return;
  }
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

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

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
    const category = categories.find((category) => category.id === expense.categoryId);

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
      <p className="text-4xl">Expenses</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DisplayCard title="Overall Expenses" content={overallExpenses(expenses).toString()} />
        <DisplayCard title="This Year" content={expensesInCurrentYear(expenses).toString()} />
        <DisplayCard title="This Month" content={expensesInCurrentMonth(expenses).toString()} />
        <DisplayCard title="This Week" content={expensesInCurrentWeek(expenses).toString()} />
        <DisplayCard title="Today" content={expensesToday(expenses).toString()} />
        <DisplayCard title="Most Spent Category" content={mostSpentCategory(expensesWithCategoryName)} />
        <DisplayCard title="Most Spent Day" content={mostSpentDay(expenses)} />
        <DisplayCard title="Least Spent Day" content={leastSpentDay(expenses)} />
      </div>

      {/* Expense Table */}
      <DataTable columns={ExpenseTableColumns} data={expensesWithCategoryName} />
    </div>
  );
}
