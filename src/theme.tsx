import { MantineProvider, createTheme } from "@mantine/core";
import { FC, ReactNode } from "react";

const theme = createTheme({
	primaryColor: "pink",
	colors: {
		pink: [
			"#ffe8ff",
			"#ffcffe",
			"#ff9bf9",
			"#ff64f5",
			"#fe38f1",
			"#fe1cef",
			"#ff09ef",
			"#e400d5",
			"#cb00be",
			"#b100a6",
		],
		warning: [
			"#fff6e0",
			"#ffeccb",
			"#ffd799",
			"#ffc063",
			"#ffad36",
			"#ffa118",
			"#ff9b04",
			"#e48700",
			"#cb7700",
			"#b06500",
		],
		error: [
			"#ffe9e8",
			"#ffd3d0",
			"#fca6a0",
			"#f8756b",
			"#f54c40",
			"#f33224",
			"#f32315",
			"#d81509",
			"#c20d05",
			"#a90001",
		],
	},
});

export const Theme: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			{children}
		</MantineProvider>
	);
};
