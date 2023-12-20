"use client";

import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { createBrowserClient } from "@supabase/ssr";

export default function Navbar() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Home Button */}
          <NavigationMenuItem>
            <button onClick={void router.push("/")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>

          {/* Logout Button */}
          <NavigationMenuItem>
            <button onClick={logout}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Logout
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
