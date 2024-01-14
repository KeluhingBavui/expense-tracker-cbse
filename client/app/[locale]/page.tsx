import { ExpenseTableColumns } from '@/components/columns';
import CreateExpenseForm from '@/components/create-expense-form';
import DisplayCard from '@/components/display-card';
import { DataTable } from '@/components/ui/data-table';
import {
  getExpensesInCurrentMonth,
  getExpensesInCurrentWeek,
  getExpensesInCurrentYear,
  getExpensesToday,
  getLeastExpensesDay,
  getMostExpensesDay,
  getOverallExpenses,
} from '@/lib/utils';
import { Category } from '@/types/category';
import { Expense } from '@/types/expense';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect, useParams } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

async function getExpenses(
  userId?: string,
  token?: string
): Promise<Expense[] | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/expenses?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      throw new Error('No userId or categoryId provided');
    }

    if (!response.ok) {
      throw new Error(
        'Error fetching expenses: ' +
          response.statusText +
          ' ' +
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
  token?: string
): Promise<Category[] | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        'Error fetching categories: ' +
          response.statusText +
          ' ' +
          response.json()
      );
    }

    const categories: Category[] = await response.json();

    return categories;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function mostSpentCategory(
  userId: string,
  token?: string
): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/max?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        'Error fetching categories: ' +
          response.statusText +
          ' ' +
          response.json()
      );
    }

    const categories: Category = await response.json();

    return categories.name;
  } catch (error) {
    console.error(error);
    return 'None';
  }
}

export default async function Home() {
  const t = await getTranslations('Index');
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
    redirect('/login');
  }

  const expenses = await getExpenses(session.user.id, session.access_token);
  const categories = await getCategoriesByUserId(
    session.user.id,
    session.access_token
  );

  if (!expenses) {
    throw new Error('Error fetching expenses');
  }

  if (!categories) {
    throw new Error('Error fetching categories');
  }

  // Map the category name to the expense
  const expensesWithCategoryName = expenses.map((expense) => {
    const category = categories.find(
      (category) => category.id === expense.categoryId
    );

    if (!category) {
      throw new Error('Error finding category');
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
          title={t('overallExpense')}
          content={(await getOverallExpenses(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title={t('thisYear')}
          content={(await getExpensesInCurrentYear(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title={t('thisMonth')}
          content={(await getExpensesInCurrentMonth(session.user.id)).toFixed(
            2
          )}
        />
        <DisplayCard
          title={t('thisWeek')}
          content={(await getExpensesInCurrentWeek(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title={t('today')}
          content={(await getExpensesToday(session.user.id)).toFixed(2)}
        />
        <DisplayCard
          title={t('mostSpentCategory')}
          content={await mostSpentCategory(
            session.user.id,
            session.access_token
          )}
        />
        <DisplayCard
          title={t('mostSpentDay')}
          content={await getMostExpensesDay(session.user.id)}
        />
        <DisplayCard
          title={t('leastSpentDay')}
          content={await getLeastExpensesDay(session.user.id)}
        />
      </div>

      <div className="grid grid-cols-2 items-center">
        <p className="text-4xl">{t('myExpenses')}</p>
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
