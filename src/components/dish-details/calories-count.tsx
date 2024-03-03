import { FC } from "react";
import { Group, Tooltip } from "@mantine/core";
import { AddedIngredient } from ".";
import { IconInfoCircle } from "@tabler/icons-react";

export const CaloriesCount: FC<{
	addedIngredients: AddedIngredient[];
	dishWeight: number;
}> = ({ addedIngredients, dishWeight }) => {
	const total_calories = addedIngredients.reduce(
		({ value, status }, item) => ({
			value:
				typeof item.kcal_100g === "number"
					? (value || 0) + Math.round((item.kcal_100g * item.weight) / 100)
					: value,
			status:
				status === "none" && typeof item.kcal_100g === "number"
					? "full"
					: status === "full" && typeof item.kcal_100g !== "number"
						? "partial"
						: status,
		}),
		{
			value: null as number | null,
			status: "none" as "none" | "partial" | "full",
		},
	);

	return (
		<Group
			mt="xs"
			gap="xs"
			style={{
				color:
					total_calories.status === "none"
						? "var(--mantine-color-error-5)"
						: total_calories.status === "partial"
							? "var(--mantine-color-warning-5)"
							: "",
			}}
		>
			{total_calories.value ? (
				<>
					Calories : total {total_calories.value} kcal (
					{Math.round((total_calories.value * 100) / dishWeight)} kcal / 100g)
				</>
			) : (
				"No calories calculated"
			)}
			{total_calories.status !== "full" && (
				<Tooltip
					label={
						total_calories.status === "none"
							? "None of the ingredients have registered calories"
							: "Some ingredients dont have registered calories"
					}
					events={{ touch: true, focus: true, hover: true }}
				>
					<sup>
						<IconInfoCircle width={12} height={12} />
					</sup>
				</Tooltip>
			)}
		</Group>
	);
};
