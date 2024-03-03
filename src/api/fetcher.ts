import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "../backend-schema";

export const fetcher = Fetcher.for<paths>();

fetcher.configure({
	baseUrl: import.meta.env.VITE_BACKEND_URL,

	init: {},
	use: [
		async (url, init, next) => {
			let response;
			try {
				response = await next(url, init);
			} catch (e: any) {
				if (!e) throw "Network error";
				throw e.data?.message;
			}
			return response;
		},
	],
});
