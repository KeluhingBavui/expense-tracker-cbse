import { Category } from "@/types/category";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch categories by user's ID from the API
 * @param userId 
 * @returns An array of categories and a boolean indicating if the request is still loading
 */
export default function useFetchCategories(userId: string) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getCategoriesByUserId(userId: string) {
		try {
			//TODO: Update this function to return the categories from the API when it's ready
			// setIsLoading(true);
			// const response = await fetch(
			// 	`${process.env.NEXT_PUBLIC_API_URL}/v1/categories?userId=${userId}`,
			// 	{
			// 		method: "GET",
			// 	}
			// );

			// if (!response.ok) {
            //     setIsLoading(false);
			// 	throw new Error("Something went wrong: " + response.statusText);
			// }

			// const data: Category[] = await response.json();

            // setCategories(data);
            // setIsLoading(false);

            //Temporary mock
			const data: Category[] = [
			    {
			        id: "67837a47-f8ff-45cf-8599-096692d09e0b",
			        name: "Food",
			        userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
			    },
			    {
			        id: "add890ad-dda6-4c49-b4db-3a6390b85c5d",
			        name: "Automobile",
			        userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
			    },
			    {
			        id: "ac244bd6-8f33-430b-a6b1-5d4184729f1a",
			        name: "Entertainment",
			        userId: "d181ecc9-480b-4e1a-9189-522665bf0e46",
			    },
			];

            setTimeout(() => {
                setCategories(data);
                setIsLoading(false);
            }, 1000); //Simulate a 1 second delay
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
