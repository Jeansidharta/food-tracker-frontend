import { ActionIcon } from "@mantine/core";
import { ROUTES } from "../../router/routes";
import { IconEdit } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const EditMeal: FC<{ meal_id: number }> = ({ meal_id }) => {
  return (
    <Link to={ROUTES.MEAL.ID.EDIT.buildPath({ meal_id })}>
      <ActionIcon size="xs">
        <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Link>
  );
};
