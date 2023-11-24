import { ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../router/routes";

export const EditMeal: FC<{ meal_id: number }> = ({ meal_id }) => {
	return (
		<Link to={ROUTES.MEAL.ID.EDIT.buildPath({ meal_id })}>
			<ActionIcon size="xs">
				<IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
			</ActionIcon>
		</Link>
	);
};
