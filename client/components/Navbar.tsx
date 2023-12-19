"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }
  
  return (
    <>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  );
}
