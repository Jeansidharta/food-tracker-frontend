import { IconCaretDownFilled } from "@tabler/icons-react";
import styles from "./styles.module.css";
import { FC, ReactNode, useState } from "react";
import { Collapse } from "@mantine/core";

export const SingleAccordion: FC<{
	headerLeftSide: ReactNode;
	headerRightSide: ReactNode;
	content?: ReactNode;
	onOpen?: () => void;
}> = ({ content, headerLeftSide, headerRightSide, onOpen = () => { } }) => {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen((s) => !s);

		if (!isOpen) {
			onOpen();
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.header} onClick={handleClick}>
				<div className={styles.leftSide}>
					<IconCaretDownFilled
						className={isOpen ? "open" : styles.leftSideClose}
					/>
					{headerLeftSide}
				</div>
				<div className={styles.creationDate}>{headerRightSide}</div>
			</div>
			<Collapse in={isOpen} className={styles.content}>
				{isOpen ? content : null}
			</Collapse>
		</div>
	);
};
