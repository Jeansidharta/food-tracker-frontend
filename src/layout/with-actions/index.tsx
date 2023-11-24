import { Link, Outlet } from "react-router-dom";
import style from "./style.module.css";
import cookingPot from "../../assets/cooking-pot-white.svg";
import { FC, useState } from "react";
import { ROUTES } from "../../router/routes";
import { ActionIcon, Button, Drawer, Group, Image } from "@mantine/core";
import { IconPlus, IconSalt, IconToolsKitchen2 } from "@tabler/icons-react";

export const LayoutActions: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Outlet />
			<ActionIcon
				variant="filled"
				aria-label="Settings"
				className={style.actionButton}
				onClick={() => setIsOpen(true)}
				size="xl"
			>
				<IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
			</ActionIcon>
			<Drawer opened={isOpen} onClose={() => setIsOpen(false)} title="Actions">
				<div className={style.actionsBar}>
					<Button component={Link} to={ROUTES.MEAL.NEW.path}>
						<IconToolsKitchen2 size={20} /> <Group mr="xs" />
						I'm having a meal
					</Button>
					<Button component={Link} to={ROUTES.DISH.NEW.path}>
						<Image
							mr="xs"
							radius="md"
							src={cookingPot}
							h={20}
							w={20}
							style={{ position: "relative", bottom: 2 }}
						/>
						I'm cooking a dish
					</Button>
					<Button component={Link} to={ROUTES.INGREDIENT.NEW.path}>
						<IconSalt size={20} /> <Group mr="xs" /> I bought an ingredient
					</Button>
				</div>
			</Drawer>
		</>
	);
};
