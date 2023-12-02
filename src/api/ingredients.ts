import useSWR from "swr";
import { fetcher } from "./fetcher";
import useSWRMutation from "swr/mutation";

const newIngredientFetcher = fetcher
	.path("/ingredient/")
	.method("post")
	.create();

export function useNewIngredient() {
	const response = useSWRMutation(
		"POST /ingredient",
		async (
			_key: string,
			{ arg }: { arg: Parameters<typeof newIngredientFetcher>[0] },
		) => newIngredientFetcher(arg),
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		newIngredient: trigger,
	} as const;
}

const getIngredientFetcher = fetcher
	.path("/ingredient/{ingredient_id}/")
	.method("get")
	.create();

export function useIngredientGet(id: number) {
	const response = useSWR(["GET /ingredient/{ingredient_id}", id], ([, id]) =>
		getIngredientFetcher({ ingredient_id: id }),
	);
	const { data, mutate, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		refresh: () => !response.isLoading && mutate(),
	} as const;
}

const scanIngredientFetcher = fetcher
	.path("/ingredient/{ingredient_id}/properties/")
	.method("post")
	.create();

export function useScanIngredient() {
	const response = useSWRMutation(
		"POST /ingredient/{ingredient_id}/properties/",
		async (
			_key: string,
			{ arg }: { arg: Parameters<typeof scanIngredientFetcher>[0] },
		) => scanIngredientFetcher(arg),
	);
	const { data, trigger, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		scanIngredient: trigger,
	} as const;
}
