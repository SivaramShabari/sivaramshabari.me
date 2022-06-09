import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { BoxBufferGeometry, MeshStandardMaterial, TextureLoader } from "three";

import ball from "../assets/textures/football_1.jpg";

const BOX_SIZE: [x: number, y: number, z: number] = [0.5, 4, 0.5];
const texture = new TextureLoader().load(ball);
const geometry = new BoxBufferGeometry(BOX_SIZE[0], BOX_SIZE[1], BOX_SIZE[2]);
const material = new MeshStandardMaterial({
	color: 0xff0000,
	roughness: 0,
	emissive: 0xaa0000,
});
export default function ({ x, y, z }: { x: number; y: number; z: number }) {
	const [ref, api] = useBox(() => ({
		mass: 0.02,
		position: [x, y, z],
		args: BOX_SIZE,
		collisionResponse: true,
	}));
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
				geometry={geometry}
				material={material}
			/>
		</>
	);
}
