import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import { BufferGeometry, LineBasicMaterial, Vector2 } from "three";
import useStore from "../hooks/useStore";

const material = new LineBasicMaterial({ color: "#ff0000", linewidth: 4 });
function Ray() {
	const pointer = new Vector2(0, 0);
	const { raycaster } = useThree();
	const setDirection = useStore((s) => s.setPointerDirection);
	useFrame(({ raycaster, camera, scene }) => {
		raycaster.setFromCamera(pointer, camera);
		setDirection(raycaster.ray.direction);
	});

	return (
		<>
			<mesh material={material} />
		</>
	);
}

export default Ray;
