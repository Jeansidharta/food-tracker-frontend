import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../../api/fetcher";

export const pageNewMealLoader = async () => {
	const [dishes, ingredients, descriptions] = await Promise.all([
		fetcher
			.path("/dish/")
			.method("get")
			.create()({ is_finished: false })
			.then((res) => res.data.data),
		fetcher
			.path("/ingredient/")
			.method("get")
			.create()({})
			.then((res) => res.data.data),
		fetcher
			.path("/meal/description/")
			.method("get")
			.create()({})
			.then((res) => res.data.data),
	]);
	return [dishes, ingredients, descriptions] as const;
};

export function usePageNewMealLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageNewMealLoader>>;
}
