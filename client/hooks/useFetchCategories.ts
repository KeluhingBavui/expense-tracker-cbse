import { Category } from "@/types/category";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch categories by user's ID from the API
 * @param userId
 * @returns An array of categories and a boolean indicating if the request is still loading
 */
export default function useFetchCategories(userId: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function getCategoriesByUserId(userId: string) {
    const session = (await supabase.auth.getSession()).data.session;
    if (!session) {
      throw new Error("User is not logged in");
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Something went wrong: " + response.statusText);
      }

      const data: Category[] = await response.json();

      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Something went wrong: " + error);
    }
  }

  useEffect(() => {
    getCategoriesByUserId(userId);
  }, [userId]);

  return { categories, isLoading };
}
