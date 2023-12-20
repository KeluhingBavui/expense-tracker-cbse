"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default function Navbar() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
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
