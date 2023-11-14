import { fetcher } from "./fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useIngredientsList() {
	const response = useSWR("GET /ingredient", async () => {
		return await fetcher.path("/ingredient/").method("get").create()({});
	});
	const { data, mutate, ...values } = response;

	return {
		...values,
		data: data?.data.data,
		refresh: () => !response.isLoading && mutate(),
	} as const;
}
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
