import { NewMealRequest, useNewMeal } from "../../../api/meals";
import ago from "s-ago";
import {
	ActionIcon,
	Anchor,
	Autocomplete,
	Button,
	Group,
	NumberInput,
	Radio,
	Select,
	Stepper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../router/routes";
import { usePageNewMealLoaderData } from "./loader";

type FormValues = {
	duration: string;
	description: string;
	components: {
		component_id: "";
		weight: string;
		component_type: "Ingredient" | "Dish";
	}[];
};

enum STEPS {
	"DESCRIPTION",
	"COMPONENTS",
	length,
}

function formValuesToRequest(values: FormValues): NewMealRequest {
	return {
		description: values.description,
		duration: Number.parseInt(values.duration),
		components: values.components.map((i) => ({
			dish_id:
				i.component_type == "Dish"
					? Number.parseInt(i.component_id)
					: undefined,
			ingredient_id:
				i.component_type == "Ingredient"
					? Number.parseInt(i.component_id)
					: undefined,
			weight: Number.parseInt(i.weight),
		})),
	};
}

export const PageNewMeal: FC = () => {
	const [active, setActive] = useState<STEPS>(0);
	const { isMutating, newMeal, data: newMealData } = useNewMeal();
	const [dishes, ingredients, mealDescriptions] = usePageNewMealLoaderData();

	const form = useForm<FormValues>({
		initialValues: {
			duration: "",
			description: "",
			components: [{ component_id: "", weight: "0", component_type: "Dish" }],
		},

		validate: (values) => {
			if (active === STEPS.COMPONENTS) {
				const problems: Record<string, string> = {};
				if (values.components.length == 0) {
					problems.components =
						"You must have at least one component in your meal";
				}
				values.components.forEach(({ component_id, weight }, index) => {
					if (!component_id) {
						problems[`components.${index}.component_id`] =
							"You must provide a component";
					}
					if (!weight) {
						problems[`components.${index}.weight`] =
							"You must provide a weight";
					}
					if (weight === "0") {
						problems[`components.${index}.weight`] = "Weight cannot be zero";
					}
				});

				return problems;
			}

			return {};
		},
	});

	const nextStep = async () => {
		if (form.validate().hasErrors) {
			return;
		}
		if (active == STEPS.length - 1) {
			await newMeal(formValuesToRequest(form.values));
			setActive(STEPS.length);
		}
		setActive((current) => (current < STEPS.length ? current + 1 : current));
	};

	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));
	return (
		<div>
			<h1>New Meal</h1>

			<Stepper active={active}>
				<Stepper.Step>
					<h2>What meal is this?</h2>
					<Autocomplete
						label="Meal description"
						placeholder="Ex: lunch, dinner, etc..."
						data={mealDescriptions ?? []}
						{...form.getInputProps(`description`)}
					/>
				</Stepper.Step>
				<Stepper.Step>
					<h2>What are you eating?</h2>
					{dishes?.length == 0 && ingredients?.length == 0 ? (
						<>You havent registered any components yet. </>
					) : (
						<>
							{form.values.components.map((_component, index) => (
								<Group key={index} mt="xs">
									<Radio.Group
										style={{ width: "100%" }}
										{...form.getInputProps(
											`components.${index}.component_type`,
										)}
									>
										<Group mt="xs">
											<Radio value="Dish" label="Dish" />
											<Radio value="Ingredient" label="Ingredient" />
										</Group>
									</Radio.Group>
									{form.values.components[index].component_type ==
										"Ingredient" && (
											<Select
												style={{ flex: "1" }}
												placeholder="Select an ingredient"
												data={(ingredients || []).map((component) => ({
													value: component.id.toString(),
													label: component?.name || "",
												}))}
												searchable
												{...form.getInputProps(
													`components.${index}.component_id`,
												)}
											/>
										)}
									{form.values.components[index].component_type == "Dish" && (
										<Select
											style={{ flex: "1" }}
											placeholder="Select a dish"
											data={(dishes || []).map((component) => ({
												value: component.id.toString(),
												label: `${component?.name || ""} (${ago(
													new Date(component.creation_date),
												)})`,
											}))}
											searchable
											{...form.getInputProps(
												`components.${index}.component_id`,
											)}
										/>
									)}
									<NumberInput
										placeholder="Grams"
										style={{ width: 140 }}
										min={0}
										suffix="g"
										thousandSeparator="_"
										hideControls
										{...form.getInputProps(`components.${index}.weight`)}
									/>
									<ActionIcon
										color="red"
										onClick={() => form.removeListItem("components", index)}
									>
										<IconTrash size="1rem" />
									</ActionIcon>
								</Group>
							))}
							<Group justify="center" mt="md">
								<Button
									onClick={() =>
										form.insertListItem("components", {
											component_type: "Dish",
										})
									}
								>
									Add Component
								</Button>
							</Group>
						</>
					)}
				</Stepper.Step>
				<Stepper.Completed>
					<h2>Success!</h2>

					<p>
						Would you like to{" "}
						<Anchor
							component={Link}
							to={ROUTES.MEAL.ID.buildPath({
								meal_id: newMealData?.meal.id || NaN,
							})}
							variant="fill"
						>
							view the Meal?
						</Anchor>
					</p>
				</Stepper.Completed>
			</Stepper>

			<Group justify="flex-end" mt="xl">
				{active !== 0 && active !== STEPS.length && (
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
				)}
				{active !== STEPS.length && (
					<Button onClick={nextStep} loading={isMutating}>
						Next step
					</Button>
				)}
				{active === STEPS.length && (
					<Button component={Link} to={ROUTES.MEAL.path}>
						Done!
					</Button>
				)}
			</Group>
		</div>
	);
};
