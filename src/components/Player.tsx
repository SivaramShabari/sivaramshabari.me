import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import useStore from "../hooks/useStore";

function Player(props: any) {
	const PLAYER_SPEED = 5;
	const setPlayerPosition = useStore((state) => state.setPlayerPosition);
	const input = useKeyboard();
	const { camera } = useThree();
	const [ref, api] = useSphere(() => ({
		mass: 1,
		type: "Dynamic",
		...props,
	}));
	const velocity = useRef([0, 0, 0]);
	const position = useRef(
		new Vector3(props.position[0], props.position[1], props.position[2])
	);
	useEffect(() => {
		api.velocity.subscribe((v) => (velocity.current = v));
		api.position.subscribe((p) => {
			position.current = new Vector3(p[0], p[1], p[2]);
			setPlayerPosition(position.current);
		});
		console.log("useEffect");
	}, [api.velocity, api.position]);
	useFrame(() => {
		camera.position.copy(
			new Vector3(position.current.x, 8, position.current.z + 8)
		);
		// camera.lookAt(position.current.x, 1.5, position.current.z - 1);
		const direction = new Vector3();
		const front = new Vector3(
			0,
			0,
			(input.ArrowDown ? 1 : 0) - (input.ArrowUp ? 1 : 0)
		);
		const side = new Vector3(
			(input.ArrowLeft ? 1 : 0) - (input.ArrowRight ? 1 : 0),
			0,
			0
		);
		direction
			.subVectors(front, side)
			.normalize()
			.multiplyScalar(PLAYER_SPEED)
			.applyEuler(camera.rotation);
		api.velocity.set(direction.x, velocity.current[1], direction.z);
		if (
			input[" "] &&
			Math.abs(parseFloat(velocity.current[1].toFixed(2))) < 0.02 &&
			Math.abs(parseFloat(position.current.y.toFixed(2))) < 1
		) {
			api.velocity.set(velocity.current[0], 6, velocity.current[2]);
		}
	});
	return (
		<>
			<mesh ref={ref as any}>
				<sphereGeometry attach="geometry" args={[0, 32, 32]} />
				<meshStandardMaterial attach="material" color="red" />
			</mesh>
			;
		</>
	);
}

export default Player;
