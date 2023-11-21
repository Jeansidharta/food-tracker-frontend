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
