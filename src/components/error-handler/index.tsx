import { FC } from "react";
import { useRouteError } from "react-router-dom";

export const ErrorHandler: FC = () => {
	const err = useRouteError() as {
		getActualType: () => { data: { message: string } };
		message: string;
	};

	if (err.message.startsWith("NetworkError")) {
		return <div>Could not connect to the back end</div>;
	}

	const message = err.getActualType().data.message;
	return <div>An error occurred: {message}</div>;
};
