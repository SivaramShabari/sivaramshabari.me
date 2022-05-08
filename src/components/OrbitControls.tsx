import {
	OrbitControls as DreiOrbitControls,
	OrbitControlsProps,
	OrthographicCamera,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";
import useStore from "../hooks/useStore";

export default function () {
	const ref = useRef<OrbitControlsType>();
	const { x, y, z } = useStore((s) => s.playerPosition);
	const setPlayerQuaternion = useStore((s) => s.setPlayerQuaternion);
	const input = useStore((s) => s.input);
	useFrame(() => {
		if (ref.current) {
			ref.current.target.copy(new Vector3(x, y, z));
			ref.current.update();
		}
	});
	return (
		<>
			<DreiOrbitControls
				ref={ref as any}
				enablePan={true}
				maxPolarAngle={Math.PI / 2}
				minZoom={0.1}
				maxZoom={1}
				maxDistance={50}
			/>
		</>
	);
}
