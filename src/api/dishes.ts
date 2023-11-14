import useSWR, { mutate } from "swr";
import { fetcher } from "./fetcher";
import useSWRMutation from "swr/mutation";

let getDishFetcher = fetcher.path("/dish/{dish_id}").method("get").create();

export function useDishGet(id: number) {
	const response = useSWR(["GET /dish/{dish_id}", id], ([_, id]) =>
		getDishFetcher({ dish_id: id }),
	);
	const { data, mutate, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		refresh: () => !response.isLoading && mutate(),
	} as const;
}

export type GetDishResult = ReturnType<typeof useDishGet>["data"];

export function useDishesList() {
	const response = useSWR("GET /dish", () =>
		fetcher.path("/dish/").method("get").create()({}),
	);
	const { data, mutate, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		refresh: () => !response.isLoading && mutate(),
	} as const;
}

let newDishFetcher = fetcher.path("/dish/").method("post").create();

export type NewDishRequest = Parameters<typeof newDishFetcher>[0];

export function useNewDish() {
	const response = useSWRMutation(
		"POST /dish",
		async (_key: string, { arg }: { arg: NewDishRequest }) => {
			return await newDishFetcher(arg);
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		newDish: trigger,
	} as const;
}

let deleteIngredientFromDishFetcher = fetcher
	.path("/dish/{dish_id}/ingredient/{ingredient_id}")
	.method("delete")
	.create();

export type DeleteIngredientFromDishRequest = Parameters<
	typeof deleteIngredientFromDishFetcher
>[0];

export function useDeleteIngredientFromDish() {
	const response = useSWRMutation(
		"DELETE /dish/{dish_id}/ingredient/{ingredient_id}",
		async (_key: string, { arg }: { arg: DeleteIngredientFromDishRequest }) => {
			let data = await deleteIngredientFromDishFetcher(arg);
			mutate(["GET /dish/{dish_id}", arg.dish_id], undefined, {
				revalidate: true,
			});
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		deleteDishIngredient: trigger,
	} as const;
}

let addIngredientToDishFetcher = fetcher
	.path("/dish/{dish_id}/ingredient/")
	.method("post")
	.create();

export type AddIngredientToDishRequest = Parameters<
	typeof addIngredientToDishFetcher
>[0];

export function useAddIngredientToDish() {
	const response = useSWRMutation(
		"POST /dish/{dish_id}/ingredient/",
		async (_key: string, { arg }: { arg: AddIngredientToDishRequest }) => {
			let data = await addIngredientToDishFetcher(arg, {});
			mutate(["GET /dish/{dish_id}", arg.dish_id], undefined, {
				revalidate: true,
			});
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data,
		addIngredientToDish: trigger,
	} as const;
}

let deleteDishFetcher = fetcher
	.path("/dish/{dish_id}")
	.method("delete")
	.create();

export type DeleteDishRequest = Parameters<typeof deleteDishFetcher>[0];

export function useDeleteDish() {
	const response = useSWRMutation(
		"DELETE /dish/{dish_id}",
		async (_key: string, { arg }: { arg: DeleteDishRequest }) => {
			let data = await deleteDishFetcher(arg);
			mutate("GET /dish", undefined, { revalidate: true });
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		deleteDish: trigger,
	} as const;
}

const mealDeletionWarningsFetcher = fetcher
	.path("/dish/{dish_id}/delete-warning")
	.method("get")
	.create();

export function useDishDeletionWarnings(dish_id: number) {
	const response = useSWR(
		["GET /dish/{dish_id}/delete-warning", dish_id],
		() => {
			return mealDeletionWarningsFetcher({ dish_id });
		},
	);
	const { data, mutate, isLoading, ...values } = response;

	return {
		data: data?.data.data,
		refresh: () => !isLoading && mutate(),
		isLoading,
		...values,
	} as const;
}
