import useSWR, { mutate } from "swr";
import { fetcher } from "./fetcher";
import useSWRMutation from "swr/mutation";

const listMealFetcher = fetcher.path("/meal/").method("get").create();

export type ListMealRequest = Parameters<typeof listMealFetcher>[0];

export function useMealList() {
	const response = useSWR("GET /meal", () => {
		return listMealFetcher({});
	});
	const { data, mutate, isLoading, ...values } = response;

	return {
		data: data?.data.data,
		refresh: () => !isLoading && mutate(),
		isLoading,
		...values,
	} as const;
}

let newMealFetcher = fetcher.path("/meal/").method("post").create();

export type NewMealRequest = Parameters<typeof newMealFetcher>[0];

export function useNewMeal() {
	const response = useSWRMutation(
		"POST /meal",
		async (_key: string, { arg }: { arg: NewMealRequest }) => {
			return await newMealFetcher(arg);
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		newMeal: trigger,
	} as const;
}

const listMealDescriptions = fetcher
	.path("/meal/description/")
	.method("get")
	.create();

export function useMealDescriptions() {
	const response = useSWR("GET /meal/descriptions", () => {
		return listMealDescriptions({});
	});
	const { data, mutate, isLoading, ...values } = response;

	return {
		data: data?.data.data,
		refresh: () => !isLoading && mutate(),
		...values,
	} as const;
}

export function useMealGet(meal_id: number) {
	const response = useSWR(["GET /meal/{meal_id}", meal_id], ([_, meal_id]) =>
		fetcher.path("/meal/{meal_id}").method("get").create()({ meal_id }),
	);
	const { data, mutate, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		refresh: () => !response.isLoading && mutate(),
	} as const;
}

let deleteDishFromMealFetcher = fetcher
	.path("/meal/{meal_id}/dish/{dish_id}")
	.method("delete")
	.create();

export type DeleteDishFromMealRequest = Parameters<
	typeof deleteDishFromMealFetcher
>[0];

export function useDeleteDishFromMeal() {
	const response = useSWRMutation(
		"DELETE /meal/{meal_id}/dish/{dish_id}",
		async (_key: string, { arg }: { arg: DeleteDishFromMealRequest }) => {
			let data = await deleteDishFromMealFetcher(arg);
			mutate(["GET /meal/{meal_id}", arg.meal_id], undefined, {
				revalidate: true,
			});
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		deleteMealDish: trigger,
	} as const;
}

let addDishToMealFetcher = fetcher
	.path("/meal/{meal_id}/dish/")
	.method("post")
	.create();

export type AddDishToMealRequest = Parameters<typeof addDishToMealFetcher>[0];

export function useAddDishToMeal() {
	const response = useSWRMutation(
		"POST /meal/{meal_id}/dish/",
		async (_key: string, { arg }: { arg: AddDishToMealRequest }) => {
			let data = await addDishToMealFetcher(arg, {});
			mutate(["GET /meal/{meal_id}", arg.meal_id], undefined, {
				revalidate: true,
			});
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data,
		addDishToMeal: trigger,
	} as const;
}

let deleteMealFetcher = fetcher
	.path("/meal/{meal_id}")
	.method("delete")
	.create();

export type DeleteMealRequest = Parameters<typeof deleteMealFetcher>[0];

export function useDeleteMeal() {
	const response = useSWRMutation(
		"DELETE /meal/{meal_id}",
		async (_key: string, { arg }: { arg: DeleteMealRequest }) => {
			let data = await deleteMealFetcher(arg);
			mutate("GET /meal", undefined, { revalidate: true });
			return data;
		},
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		deleteMeal: trigger,
	} as const;
}
