import DisplayCard from "@/components/display-card";
import ExpenseTable from "@/components/expense-table";
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

  if (!expenses) {
    throw new Error("Error fetching expenses");
  }

  return (
    <div className="grid gap-4">
      <p className="text-4xl">Expenses</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <DisplayCard title="Food" content="$100" />
        <DisplayCard title="Food" content="$100" />
        <DisplayCard title="Food" content="$100" />
        <DisplayCard title="Food" content="$100" />
      </div>

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />
    </div>
  );
}
