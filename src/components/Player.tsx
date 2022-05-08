import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import useStore from "../hooks/useStore";

function Player({ ...props }) {
	useInput();
	const PLAYER_BOUNDARY = 100;
	const PLAYER_SPEED = 6;
	const velocity = useRef([0, 0, 0]);
	const position = useRef(new Vector3(0, 2, 0));

	const setPlayerPosition = useStore((state) => state.setPlayerPosition);
	const input = useStore((state) => state.input);
	const playerQuaternion = useStore((state) => state.playerQuaternion);
	const setPlayerQuaternion = useStore((state) => state.setPlayerQuaternion);
	const isCameraLocked = useStore((state) => state.isCameraLocked);
	const [ref, api] = useSphere(() => ({
		mass: 2,
		type: "Dynamic",
		...props,
	}));
	useEffect(() => {
		const subscribeV = api.velocity.subscribe((v) => (velocity.current = v));
		const subscribeP = api.position.subscribe((p) => {
			const x =
				p[0] > PLAYER_BOUNDARY
					? PLAYER_BOUNDARY
					: p[0] < -PLAYER_BOUNDARY
					? -PLAYER_BOUNDARY
					: p[0];
			const y = p[1] > 5 ? 5 : p[1] < -5 ? -5 : p[1];
			const z =
				p[2] > PLAYER_BOUNDARY
					? PLAYER_BOUNDARY
					: p[2] < -PLAYER_BOUNDARY
					? -PLAYER_BOUNDARY
					: p[2];
			position.current = new Vector3(x, p[1], z);
			setPlayerPosition(position.current);
			if (
				p[0] < -30 ||
				p[0] > 30 ||
				p[2] < -30 ||
				p[2] > 30 ||
				p[1] < -5 ||
				p[1] > 5
			)
				api.position.set(x, y, z);
		});
		return () => {
			subscribeV();
			subscribeP();
		};
	}, [api.velocity, api.position]);

	useFrame(({ camera, clock, mouse, controls }) => {
		if (isCameraLocked) {
			const currentLookAt = new Vector3(0, 0, 0);
			const currentPosition = new Vector3(0, 0, 0);
			const lerp = 1.0 - Math.pow(0.001, clock.elapsedTime * 0.001);
			const p = position.current;

			const offsetPosition = new Vector3(-2, 7, -10);
			offsetPosition.applyQuaternion(playerQuaternion);
			offsetPosition.add(new Vector3(p.x, 0, p.z));
			currentPosition.lerp(offsetPosition, lerp);
			camera.position.copy(offsetPosition);

			const offsetLookAt = new Vector3(0, 0.8, 12);
			offsetLookAt.applyQuaternion(playerQuaternion);
			offsetLookAt.add(new Vector3(p.x, 0, p.z));
			currentLookAt.lerp(offsetLookAt, lerp);
			camera.lookAt(offsetLookAt);
		}
		const q = new Quaternion();
		const a = new Vector3(0, 1, 0);
		const r = playerQuaternion;

		if (input.left) {
			q.setFromAxisAngle(a, 0.03);
			r?.multiply(q);
			setPlayerQuaternion(r);
		}
		if (input.right) {
			q.setFromAxisAngle(a, -0.03);
			r?.multiply(q);
			setPlayerQuaternion(r);
		}

		const direction = new Vector3();
		const front = new Vector3(
			0,
			0,
			(input.front ? 1 : 0) - (input.back ? 1 : 0)
		);
		const side = new Vector3(0, 0, 0);

		direction
			.subVectors(front, side)
			.applyQuaternion(playerQuaternion)
			.normalize();
		if (input.jump && position.current.y < 2) {
			velocity.current[1] = 8;
		}
		direction.multiplyScalar(PLAYER_SPEED + (input.sprint ? 4 : 0));
		api.velocity.set(direction.x, velocity.current[1], direction.z);
	});
	return (
		<>
			<mesh position={position.current} ref={ref as any}>
				<sphereGeometry args={[0, 32, 32]} />
				<meshStandardMaterial color="blue" />
			</mesh>
		</>
	);
}

export default Player;
