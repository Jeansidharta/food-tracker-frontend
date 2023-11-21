import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../api/fetcher";

export const pageIngredientsLoader = async () => {
	const data = await fetcher
		.path("/ingredient/")
		.method("get")
		.create()({})
		.then((res) => res.data.data);
	return data;
};

export function usePageIngredientsLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageIngredientsLoader>>;
}
