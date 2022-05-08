import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useStore, { Input } from "./useStore";

const keyMap: { [key: string]: string } = {
	ArrowUp: "front",
	ArrowDown: "back",
	ArrowLeft: "left",
	ArrowRight: "right",
	w: "front",
	s: "back",
	a: "left",
	d: "right",
	" ": "jump",
	Shift: "sprint",
	Control: "shoot",
};
const keys = Object.keys(keyMap);
export const useInput = () => {
	const THREE = useThree();
	const setState = useStore((state) => state.setInput);
	const [input, setInput] = useState<Input>({
		front: false,
		back: false,
		sprint: false,
		left: false,
		right: false,
		jump: false,
		shoot: false,
	});
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (keys.includes(event.key))
				setInput((i) => getInputState(i, event.key, "key_down"));
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (keys.includes(event.key))
				setInput((i) => getInputState(i, event.key, "key_up"));
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);

		return () => {
			window.removeEventListener("keydown", onKeyDown, false);
			window.removeEventListener("keyup", onKeyUp, false);
		};
	}, []);
	useEffect(() => {
		setState(input);
	}, [input]);
	return input;
};

const getInputState = (
	state: Input,
	eventKey: string,
	type: "key_up" | "key_down"
) => {
	return {
		...state,
		[keyMap[eventKey]]: type === "key_down",
	};
};
