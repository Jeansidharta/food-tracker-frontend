import styles from "./styles.module.css";
import { useDeleteDishFromMeal, useMealList } from "../../api/meals";
import { ActionIcon, Button, Divider, Group, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { FC, useState } from "react";

export const DishItem: FC<{
  dish: {
    dish_id: number;
    dish_name?: string | undefined | null;
    weight: number;
  };
  meal_id: number;
}> = ({ meal_id, dish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteMealDish, isMutating } = useDeleteDishFromMeal();
  const { refresh: refreshMeals } = useMealList();

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  async function handleDelete() {
    await deleteMealDish({ meal_id, dish_id: dish.dish_id });
    setIsModalOpen(false);
    refreshMeals();
  }
  return (
    <div className={styles.dish_item}>
      <div>{dish.dish_name}</div>
      <Divider />
      <div style={{ width: "100%" }}>
        <ActionIcon size="xs" onClick={openModal}>
          <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </div>
      <Modal opened={isModalOpen} onClose={closeModal} title="Confirmation">
        <Text>
          Are you sure you want to delete <strong>{dish.dish_name}?</strong>
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
