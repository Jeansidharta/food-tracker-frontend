import { Loading } from "../components/loading";

export const requestResult = <T = unknown, E = unknown>(
	requestResult: { isLoading: boolean; data: T; error: E },
	onDone: (result: NonNullable<T>) => React.ReactNode,
) => {
	if (requestResult.isLoading) {
		return <Loading />;
	} else if (requestResult.error) {
		// Using any here to force error to be printed
		return <p>Error</p>;
	} else if (requestResult.data) {
		return onDone(requestResult.data);
	} else {
		return <>No data found</>;
	}
};
