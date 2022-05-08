import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import Ray from "./Ray";

function CrossHair() {
	const { mouse, raycaster, camera, scene } = useThree();
	const [points, setPoints] = useState<Vector3[]>([]);
	useFrame(({ clock }) => {
		const intersects = raycaster.intersectObjects(scene.children);
		if (intersects.length > 0) {
			setPoints(intersects.map((i) => i.point));
		}
	});
	return (
		<>
			<mesh>{/* <Ray points={points} /> */}</mesh>
		</>
	);
}

export default CrossHair;
