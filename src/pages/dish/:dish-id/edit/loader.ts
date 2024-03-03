import { Params, useLoaderData } from "react-router-dom";
import { fetcher } from "../../../../api/fetcher";

export const pageEditDishLoader = async ({
	params,
}: {
	params: Params<"dish_id">;
}) => {
	const dish_id = Number(params.dish_id);
	if (!Number.isFinite(dish_id)) {
		throw new Error("Dish id is not a number");
	}

	const [dish_data, ingredientsList] = await Promise.all([
		fetcher
			.path("/dish/{dish_id}/")
			.method("get")
			.create()({ dish_id })
			.then((res) => res.data.data),
		fetcher
			.path("/ingredient/")
			.method("get")
			.create()({})
			.then((res) => res.data.data.ingredients),
	]);
	if (!dish_data) {
		throw new Error("Dish does not exist");
	}
	return [dish_data, ingredientsList] as const;
};

export function usePageEditDishLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageEditDishLoader>>;
}
