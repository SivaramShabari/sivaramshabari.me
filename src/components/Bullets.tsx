import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import useStore, { Bullet } from "../hooks/useStore";
import CBullet from "./Bullet";

function Bullets() {
	const { shoot } = useInput();
	const playerPosition = useStore((s) => s.playerPosition);
	const direction = useStore((s) => s.pointerDirection);
	const bullets = useStore((s) => s.bullets);
	const addBullet = useStore((s) => s.addBullet);
	useEffect(() => {
		if (shoot) {
			const b = [...bullets];
			const bullet = new Bullet(
				playerPosition.clone(),
				direction.clone().multiplyScalar(50)
			);
			addBullet(bullet);
		}
	}, [shoot]);
	return (
		<>
			{bullets
				.filter((b) => b.state === "alive")
				.map((bullet, index) => {
					return (
						<CBullet
							position={bullet.position}
							velocity={bullet.velocity}
							key={index}
						/>
					);
				})}
		</>
	);
}

export default Bullets;
