'use client';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';

export default function Login() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function loginWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="flex gap-4 justify-center items-center w-auto">
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Expense Tracker
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <Button onClick={loginWithGithub}>Login with Github</Button>
          <Button onClick={loginWithGoogle}>Login with Google</Button>
        </div>
      </div>
    </div>
  );
}
