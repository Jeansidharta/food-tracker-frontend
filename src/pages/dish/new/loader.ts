import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../../api/fetcher";

export const pageNewDishLoader = async () => {
	const data = await fetcher
		.path("/ingredient/")
		.method("get")
		.create()({})
		.then((res) => res.data.data);
	return data;
};

export function usePageNewDishLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageNewDishLoader>>;
}
