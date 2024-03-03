import { Params, useLoaderData } from "react-router-dom";
import { fetcher } from "../../../../api/fetcher";

export const pageEditMealLoader = async ({
	params,
}: {
	params: Params<"meal_id">;
}) => {
	const meal_id = Number(params.meal_id);
	if (!Number.isFinite(meal_id)) {
		throw new Error("Meal id is not a number");
	}

	const [meal_data, ingredientsList, dishesList, descriptions] =
		await Promise.all([
			fetcher
				.path("/meal/{meal_id}/")
				.method("get")
				.create()({ meal_id })
				.then((res) => res.data.data),
			fetcher
				.path("/ingredient/")
				.method("get")
				.create()({})
				.then((res) => res.data.data.ingredients),
			fetcher
				.path("/dish/")
				.method("get")
				.create()({})
				.then((res) => res.data.data),
			fetcher
				.path("/meal/description/")
				.method("get")
				.create()({})
				.then((res) => res.data.data),
		]);

	if (!meal_data) {
		throw new Error("Meal does not exist");
	}
	return [meal_data, ingredientsList, dishesList, descriptions] as const;
};

export function usePageEditMealLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageEditMealLoader>>;
}
