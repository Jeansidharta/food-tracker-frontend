import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../api/fetcher";

const fetchIngredients = fetcher.path("/ingredient/").method("get").create();

export const pageIngredientsLoader = async () => {
	return (await fetchIngredients({})).data.data.ingredients;
};

export function usePageIngredientsLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageIngredientsLoader>>;
}
