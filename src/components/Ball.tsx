import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { applyProps } from "@react-three/fiber/dist/declarations/src/core/utils";
import { useEffect, useState } from "react";
import {
	BoxGeometry,
	MeshBasicMaterial,
	MeshStandardMaterial,
	SphereGeometry,
	TextureLoader,
	Vector3,
} from "three";

import ball from "../assets/textures/football_1.jpg";

const texture = new TextureLoader().load(ball);
const g = new BoxGeometry(1, 1, 1);
const m = new MeshStandardMaterial({
	color: 0xff0000,
	roughness: 0,
});
export default function ({ x, y, z }: { x: number; y: number; z: number }) {
	const [ref, api] = useBox(() => ({ mass: 0.2, position: [x, y, z] }));
	const [v, setV] = useState(0);
	const [originalVelocity, setO] = useState([0, 0, 0]);
	const [p, setP] = useState([0, 0, 0]);
	useEffect(() => {
		const velocity = api.velocity.subscribe((v) => setO(v));
		const position = api.position.subscribe((p) => setP(p));
		return () => {
			velocity();
			position();
		};
	}, []);
	useFrame(() => {
		if (p[1] < 5 && v > 0)
			api.velocity.set(
				originalVelocity[0],
				originalVelocity[1] + v,
				originalVelocity[2]
			);
	});
	return (
		<>
			<mesh
				onPointerEnter={(e) => e.object.scale.set(1.1, 1.1, 1.1)}
				onPointerLeave={(e) => e.object.scale.set(1, 1, 1)}
				onClick={() => {
					setV(20);
					setTimeout(() => {
						setV(0);
					}, 10);
				}}
				castShadow
				receiveShadow
				ref={ref as any}
				geometry={g}
				material={m}
			/>
		</>
	);
}
