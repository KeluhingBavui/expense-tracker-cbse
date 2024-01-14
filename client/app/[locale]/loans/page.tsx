import { LoanTableColumns } from '@/components/columns';
import CreateLoanForm from '@/components/create-loan-form';
import DisplayCard from '@/components/display-card';
import { DataTable } from '@/components/ui/data-table';
import { Loan } from '@/types/loan';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

async function getLoans(userId?: string): Promise<Loan[]> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/loans?userId=${userId}`,
        {
          method: 'GET',
        }
      );
    } else {
      throw new Error('No userId provided');
    }

    if (!response.ok) {
      throw new Error(
        'Error fetching loans: ' + response.statusText + ' ' + response.json()
      );
    }

    const loans: Loan[] = await response.json();
    return loans;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getTotalToReceive(userId?: string): Promise<number> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/loans/to-receive?userId=${userId}`,
        {
          method: 'GET',
        }
      );
    } else {
      throw new Error('No userId provided');
    }

    if (!response.ok) {
      throw new Error(
        'Error fetching total to receive amount: ' +
          response.statusText +
          ' ' +
          response.json()
      );
    }

    const totalToReceiveAmount: number = await response.json();
    return totalToReceiveAmount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function getTotalToRepay(userId?: string): Promise<number> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/loans/to-repay?userId=${userId}`,
        {
          method: 'GET',
        }
      );
    } else {
      throw new Error('No userId provided');
    }

    if (!response.ok) {
      throw new Error(
        'Error fetching total to repay amount: ' +
          response.statusText +
          ' ' +
          response.json()
      );
    }

    const totalToRepayAmount: number = await response.json();
    return totalToRepayAmount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export default async function Loans() {
  const cookieStore = cookies();
  const t = await getTranslations('Loans');

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

  const loans = await getLoans(session.user.id);
  const totalToReceiveAmount = await getTotalToReceive(session.user.id);
  const totalToRepayAmount = await getTotalToRepay(session.user.id);

  return (
    <>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <DisplayCard
            title={t('totalToReceive')}
            content={
              totalToReceiveAmount <= 0
                ? 'Completed'
                : `MYR ${String(totalToReceiveAmount)}`
            }
          />
          <DisplayCard
            title={t('totalToRepay')}
            content={
              totalToRepayAmount <= 0
                ? 'Completed'
                : `MYR ${String(totalToRepayAmount)}`
            }
          />
        </div>
        <div className="grid items-center grid-cols-2">
          <h1 className="text-4xl font-semibold">{t('myLoans')}</h1>
          <CreateLoanForm buttonStyle="justify-self-end" session={session} />
        </div>

        <DataTable columns={LoanTableColumns} data={loans} />
      </div>
    </>
  );
}
