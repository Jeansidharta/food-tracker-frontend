import { Params, useLoaderData } from "react-router-dom";
import { fetcher } from "../../../api/fetcher";

export const pageGetIngredientLoader = async ({
	params,
}: {
	params: Params<"ingredient_id">;
}) => {
	const ingredient_id = Number(params.ingredient_id);
	if (!Number.isFinite(ingredient_id)) {
		throw new Error("Ingredient id is not a number");
	}
	const ingredient_data = await fetcher
		.path("/ingredient/{ingredient_id}/")
		.method("get")
		.create()({ ingredient_id })
		.then((res) => res.data.data);

	if (!ingredient_data) {
		throw new Error("Ingredient does not exist");
	}
	return { ingredient: ingredient_data };
};

export function usePageGetIngredientLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageGetIngredientLoader>>;
}
