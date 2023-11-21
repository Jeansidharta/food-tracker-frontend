import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../api/fetcher";

export const pageDishLoader = async () => {
	const dishList = await fetcher
		.path("/dish/")
		.method("get")
		.create()({})
		.then((res) => res.data.data);
	return dishList;
};

export function usePageDishLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageDishLoader>>;
}
