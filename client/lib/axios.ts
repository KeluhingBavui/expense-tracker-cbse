import { createBrowserClient, createServerClient } from "@supabase/ssr";
import Axios from "axios";
import { cookies } from "next/headers";

export const getClientUserSession = async () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});
