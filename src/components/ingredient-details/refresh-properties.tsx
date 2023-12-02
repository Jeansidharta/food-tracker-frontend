import { FC, useState } from "react";
import { ActionIcon, Button, Group, Modal } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useScanIngredient } from "../../api/ingredients";

export const RefreshProperties: FC<{
	product_code: string;
	ingredient_id: number;
}> = ({ ingredient_id, product_code }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { scanIngredient, isMutating: isLoadingSubmit } = useScanIngredient();

	async function handleSubmit() {
		await scanIngredient({ ingredient_id, product_code });
		setIsOpen(false);
	}

	return (
		<>
			<ActionIcon size="xs" onClick={() => setIsOpen(true)}>
				<IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
			</ActionIcon>

			<Modal
				onClick={(event) => event.stopPropagation()}
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title="Refresh Open Food Facts"
			>
				<p>
					You are about to refresh the Open Food Facts data. This should only be
					done if you've recently altered some information in there. Are you
					sure you want to procceed?
				</p>
				<Group justify="end" mt="md">
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} loading={isLoadingSubmit}>
						Refresh
					</Button>
				</Group>
			</Modal>
		</>
	);
};
