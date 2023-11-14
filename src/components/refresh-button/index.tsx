import { IconRefresh } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import { FC } from "react";

export const RefreshButton: FC<{
	onClick?: () => void;
	isLoading?: boolean;
}> = ({ onClick, isLoading = false }) => {
	return (
		<ActionIcon
			variant="filled"
			loading={isLoading}
			aria-label="refresh"
			onClick={onClick}
		>
			<IconRefresh />
		</ActionIcon>
	);
};
