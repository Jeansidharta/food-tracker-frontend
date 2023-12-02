import { Params, useLoaderData } from "react-router-dom";

export const pageScanIngredientLoader = async ({
	params,
}: {
	params: Params<"ingredient_id">;
}) => {
	const ingredient_id = Number(params.ingredient_id);

	if (!Number.isFinite(ingredient_id)) {
		throw new Error("Ingredient id is invalid");
	}

	return { ingredient_id };
};

export function usePageScanIngredientLoaderData() {
	return useLoaderData() as Awaited<
		ReturnType<typeof pageScanIngredientLoader>
	>;
}
