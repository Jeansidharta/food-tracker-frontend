import { FC, useState } from "react";
import styles from "./styles.module.css";
import ago from "s-ago";
import { ActionIcon, Divider, Text, Modal, Group, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteIngredientFromDish } from "../../api/dishes";

export const IngredientItem: FC<{
	added_ingredient: {
		addition_date: number;
		ingredient_id: number;
		ingredient_name: string;
		weight: number;
	};
	dish_id: number;
}> = ({
	added_ingredient: { ingredient_name, addition_date, ingredient_id },
	dish_id,
}) => {
		const [isModalOpen, setIsModalOpen] = useState(false);
		const { deleteDishIngredient, isMutating } = useDeleteIngredientFromDish();

		function closeModal() {
			setIsModalOpen(false);
		}

		function openModal() {
			setIsModalOpen(true);
		}

		async function handleDelete() {
			await deleteDishIngredient({ ingredient_id, dish_id });
			setIsModalOpen(false);
		}

		return (
			<div className={styles.ingredient_item}>
				<div>{ingredient_name}</div>
				{ago(new Date(addition_date))}
				<Divider />
				<div style={{ width: "100%" }}>
					<ActionIcon size="xs" onClick={openModal}>
						<IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
					</ActionIcon>
				</div>
				<Modal opened={isModalOpen} onClose={closeModal} title="Confirmation">
					<Text>
						Are you sure you want to delete <strong>{ingredient_name}?</strong>
					</Text>
					<Group justify="end">
						<Button variant="outline" onClick={closeModal}>
							No
						</Button>
						<Button onClick={handleDelete} loading={isMutating}>
							Yes
						</Button>
					</Group>
				</Modal>
			</div>
		);
	};
