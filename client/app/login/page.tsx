"use client";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
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

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        console.log("reset password");
        // const newPassword = prompt(
        //   "What would you like your new password to be?"
        // );
        // const { data, error } = await supabase.auth.updateUser({
        //   password: newPassword ?? "",
        // });
        router.push("/reset-password");
        // if (data) alert("Password updated successfully!");
        // if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={loginWithGithub}>Login with Github</Button>
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </div>
  );
}
