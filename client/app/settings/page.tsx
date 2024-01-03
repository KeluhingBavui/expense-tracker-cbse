import React from "react";
import { axios } from "@/lib/axios";
import { Field as CurrencyField, List } from "@/components/settings/Currency";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Separator } from "@/components/ui/separator";
import Field from "@/components/settings/Field";

const fetchSettings = async (userId: string) => {
  const { data } = await axios.get(`/settings`, {
    params: { userId },
  });
  return data;
};

const SettingsPage = async () => {
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
  const settings = await fetchSettings(session?.user.id!);
  return (
    <div>
      <h1 className="font-bold text-4xl my-2"> Settings</h1>
      <Separator className="h-[3px] bg-white mb-4" />
      <div className="grid grid-cols-2 items-start">
        <div className="grid gap-8">
          <Field label="Language" value={settings.language} />
          <Field label="Font" value={settings.font} />
          <Field label="Theme" value={settings.theme} />
          <CurrencyField currency={settings.currency} />
        </div>
        <List />
      </div>
    </div>
  );
};

export default SettingsPage;
