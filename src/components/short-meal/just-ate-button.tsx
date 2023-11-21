import { FC, useState } from "react";
// import styles from "./styles.module.css";
import { Button, Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetcher } from "../../api/fetcher";
import { DateTimePicker } from "@mantine/dates";
import { useRevalidator } from "react-router-dom";

type FormValues = {
	eat_date: Date;
};

const editMealEatDate = fetcher
	.path("/meal/{meal_id}/eat_date/")
	.method("post")
	.create();

function formValuesToRequest(
	values: FormValues,
	meal_id: number,
): EditMealEatDateParams {
	return {
		meal_id,
		eat_date: values.eat_date.getTime(),
	};
}

type EditMealEatDateParams = Parameters<typeof editMealEatDate>[0];

export const JustAteButton: FC<{ meal_id: number }> = ({ meal_id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const revalidator = useRevalidator();

	const form = useForm<FormValues>({
		initialValues: {
			eat_date: new Date(),
		},

		validate: (values) => ({
			eat_date: values.eat_date ? null : "You must provide a date",
		}),
	});

	async function handleSubmit(values: FormValues) {
		const data = formValuesToRequest(values, meal_id);
		setIsLoading(true);
		try {
			await editMealEatDate(data);
			revalidator.revalidate();
			setIsOpen(false);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Button
				size="compact-xs"
				onClick={(event) => {
					setIsOpen(true);
					event.stopPropagation();
				}}
			>
				Just ate!
			</Button>
			<Modal
				onClick={(event) => event.stopPropagation()}
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title="Just ate"
			>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<DateTimePicker
						label="Eaten at"
						valueFormat="YYYY/MM/DD - HH[h] MM[m]"
						placeholder="Pick date"
						{...form.getInputProps("eat_date")}
					/>
					<Group justify="end" mt="md">
						<Button variant="outline" onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button type="submit" loading={isLoading}>
							Change!
						</Button>
					</Group>
				</form>
			</Modal>
		</>
	);
};
