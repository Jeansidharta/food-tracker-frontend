import { FC, useEffect, useState } from "react";

type Animations = "arrow";

const loadingAnimations: Record<Animations, string[]> = {
	arrow: [
		"[     ]",
		"[>    ]",
		"[=>   ]",
		"[==>  ]",
		"[===> ]",
		"[====>]",
		"[=====]",
		"[<====]",
		"[ <===]",
		"[  <==]",
		"[   <=]",
		"[    <]",
	],
};

export const Loading: FC<{
	animation?: Animations;
	animationSpeed?: number;
}> = ({ animation = "arrow", animationSpeed = 200 }) => {
	const [frame, setFrame] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setFrame((frame) => (frame + 1) % loadingAnimations[animation].length);
		}, animationSpeed);

		return () => {
			clearInterval(intervalId);
		};
	}, [animationSpeed, setFrame, animation]);

	return <pre>{loadingAnimations[animation][frame]}</pre>;
};
