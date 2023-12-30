import { getClientUserSession } from "@/lib/axios";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useUserSession = () => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    const userSessionSetter = async () => {
      const session = await getClientUserSession();
      if (session) {
        setSession(session);
      }
    };
    userSessionSetter();
  }, []);

  return { session };
};
