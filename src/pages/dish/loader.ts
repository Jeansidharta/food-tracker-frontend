import { useLoaderData } from "react-router-dom";
import { fetcher } from "../../api/fetcher";

export const pageDishLoader = async ({ request }: { request: Request }) => {
	const is_finished_str =
		new URL(request.url).searchParams.get("is_finished") || "false";

	const is_finished =
		is_finished_str === "true"
			? true
			: is_finished_str === "false"
				? false
				: false;

	const dishList = await fetcher
		.path("/dish/")
		.method("get")
		.create()({ is_finished })
		.then((res) => res.data.data);
	return dishList;
};

export function usePageDishLoaderData() {
	return useLoaderData() as Awaited<ReturnType<typeof pageDishLoader>>;
}
