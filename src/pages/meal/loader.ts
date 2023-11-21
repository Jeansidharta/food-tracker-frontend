import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../api/fetcher";

export const pageMealLoader = async () => {
	const dishList = await fetcher
		.path("/meal/")
		.method("get")
		.create()({})
		.then((res) => res.data.data);
	return dishList;
};

export function usePageMealLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageMealLoader>>;
}
