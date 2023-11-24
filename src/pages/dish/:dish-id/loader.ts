import { Params, useLoaderData } from "react-router-dom";
import { fetcher } from "../../../api/fetcher";

export const pageGetDishLoader = async ({
	params,
}: {
	params: Params<"dish_id">;
}) => {
	const dish_id = Number(params.dish_id);
	if (!Number.isFinite(dish_id)) {
		throw new Error("Dish id is not a number");
	}

	const dish_data = await fetcher
		.path("/dish/{dish_id}/")
		.method("get")
		.create()({ dish_id })
		.then((res) => res.data.data);

	if (!dish_data) {
		throw new Error("Dish does not exist");
	}
	return dish_data;
};

export function usePageGetDishLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageGetDishLoader>>;
}
