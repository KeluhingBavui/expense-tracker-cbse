import { SavingTableColumns } from "@/components/columns";
import CreateSavingForm from "@/components/create-saving-form";
import DisplayCard from "@/components/display-card";
import { DataTable } from "@/components/ui/data-table";
import { overallExpenses } from "@/lib/utils";
import { Saving } from "@/types/saving";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getTotalToSave(userId?: string): Promise<number> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/savings/total-to-save?userId=${userId}`,
        {
          method: "GET",
        }
      );
    } else {
      throw new Error("No userId provided");
    }

    if (!response.ok) {
      throw new Error(
        "Error fetching total to save amount: " +
          response.statusText +
          " " +
          response.json()
      );
    }

    const totalToSaveAmount: number = await response.json();
    return totalToSaveAmount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function getToSave(savingId?: string): Promise<number> {
  try {
    let response: Response;

    if (savingId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/savings/to-save?id=${savingId}`,
        {
          method: "GET",
        }
      );
    } else {
      throw new Error("No id provided");
    }

    if (!response.ok) {
      throw new Error(
        "Error fetching to save amount: " +
          response.statusText +
          " " +
          response.json()
      );
    }

    const toSaveAmount: number = await response.json();
    return toSaveAmount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function getSavings(userId?: string): Promise<Saving[] | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/savings?userId=${userId}`,
        {
          method: "GET",
        }
      );
    } else {
      throw new Error("No userId provided");
    }

    if (!response.ok) {
      throw new Error(
        "Error fetching savings: " + response.statusText + " " + response.json()
      );
    }

    const savings: Saving[] = await response.json();

    for (const saving of savings) {
      try {
        const toSaveAmount = await getToSave(saving.id);
        saving.to_save_amount = toSaveAmount;
      } catch (error) {
        console.error(
          `Error fetching to_save_amount for saving ${saving.id}:`,
          error
        );
      }
    }

    return savings;
  } catch (error) {
    console.error(error);
    return;
  }
}

export default async function Savings() {
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

  const savings = await getSavings(session.user.id);
  const totalToSaveAmount = await getTotalToSave(session.user.id);

  if (!savings) {
    throw new Error("Error fetching savings");
  }

  return (
    <>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <DisplayCard
            title="Total to Save"
            content={
              totalToSaveAmount < 0
                ? "Completed"
                : "MYR " + String(totalToSaveAmount)
            }
          />
        </div>

        <div className="grid items-center grid-cols-2">
          <p className="text-4xl">My Savings</p>
          <CreateSavingForm buttonStyle="justify-self-end" session={session} />
        </div>
        {/* Saving Table */}
        <DataTable columns={SavingTableColumns} data={savings} />
      </div>
    </>
  );
}
