"use client";

import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { createBrowserClient } from "@supabase/ssr";
import { Notification } from "@/types/notification";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
interface NavbarProps {
  notifications: Notification[] | undefined;
}

export default function Navbar({ notifications }: NavbarProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  console.log(notifications);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          {/* Home Button */}
          <NavigationMenuItem>
            <button onClick={() => router.push("/")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
          {/* Profile Button */}
          <NavigationMenuItem>
            <button onClick={() => router.push("/profile")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
          {/* Savings Button */}
          <NavigationMenuItem>
            <button onClick={() => router.push("/savings")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Savings
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
          {/* Loans Button */}
          <NavigationMenuItem>
            <button onClick={() => router.push("/loans")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Loans
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
          {/* Settings Button */}
          <NavigationMenuItem>
            <button onClick={() => router.push("/settings")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Settings
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Notifications</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ScrollArea className="h-72 w-64 rounded-md border">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Notifications
                  </h4>
                  {notifications?.length ? (
                    notifications.map(
                      (notification) =>
                        notification.webEnabled && (
                          <div
                            key={notification.id}
                            className="flex h-full w-full select-none flex-col justify-end rounded-md p-2 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-sm font-normal">
                              {/* {notification.message} */}
                              {notification.message}
                            </div>
                          </div>
                        )
                    )
                  ) : (
                    <li>
                      <p>No notifications</p>
                    </li>
                  )}
                </div>
              </ScrollArea>
            </NavigationMenuContent>
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
