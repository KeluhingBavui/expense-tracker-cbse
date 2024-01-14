import EditProfileForm from "@/components/edit-profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/types/profile";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getProfile(
  userId?: string,
  token?: string
): Promise<Profile | undefined> {
  try {
    let response: Response;

    if (userId) {
      response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      throw new Error("No userId provided");
    }
    if (!response.ok) {
      throw new Error(
        "Error fetching profile: " + response.statusText + " " + response.json()
      );
    }

    const profile: Profile = await response.json();
    return profile;
  } catch (error) {
    console.error(error);
    return;
  }
}
export default async function ProfilePage() {
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
    redirect("/login");
  }
  const profile = await getProfile(session.user.id, session.access_token);

  if (!profile) {
    throw new Error("Error fetching profile");
  }

  const profileItems = Object.keys(profile)
    .filter((val) => val !== "id" && val !== "userId")
    .map((value, key) => (
      <>
        <div
          className="text-center capitalize font-bold border-r py-2"
          key={key}
        >
          <p>{value}</p>
        </div>
        <div className="col-span-3 py-2 px-6">
          <p>{Object.values(profile)[key + 1]}</p>
        </div>
      </>
    ));
  return (
    <div className="grid gap-4">
      <div className="grid items-center grid-cols-4">
        <p className="text-4xl col-span-3">My Profile</p>
        <EditProfileForm profile={profile} session={session} />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-4">{profileItems}</div>
        </CardContent>
      </Card>
    </div>
  );
}
