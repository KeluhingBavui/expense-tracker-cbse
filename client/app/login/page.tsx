"use client";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";

export default function Login() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function loginWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={loginWithGithub}>Login with Github</Button>
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </div>
  );
}
