import { useEffect, useState } from "react";

export const useKeyboard = () => {
	const [keyMap, setKeyMap] = useState<{ [key: string]: boolean }>({});
	const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (keys.includes(event.key)) {
				setKeyMap((keyMap) => ({ ...keyMap, [event.key]: true }));
			}
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (keys.includes(event.key)) {
				setKeyMap((keyMap) => ({ ...keyMap, [event.key]: false }));
			}
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
		};
	}, []);
	return keyMap;
};
