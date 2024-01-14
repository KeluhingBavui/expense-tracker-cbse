import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Settings } from '@/types/settings';
import { CookieOptions, createServerClient } from '@supabase/ssr';

async function getSettings(userId?: string): Promise<Settings | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/v1/settings?userId=' + userId,
        {
          method: 'GET',
        }
      );
    } else {
      throw new Error('No userId provided');
    }

    if (!response.ok) {
      throw new Error(
        'Error fetching savings: ' + response.statusText + ' ' + response.json()
      );
    }

    const settings: Settings = await response.json();

    return settings;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    const settings = await getSettings(
      (
        await supabase.auth.getUser()
      ).data?.user?.id
    );

    const locale = settings?.language ?? 'en';

    // If "next" is in param, use it as the redirect URL
    let next = searchParams.get('next') ?? '/';
    if (!error) {
      // Ensure that the locale path is correct
      if (!next.startsWith(`/${locale}/`)) {
        next = `/${locale}${next}`;
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
