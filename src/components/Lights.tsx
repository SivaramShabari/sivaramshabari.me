import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AxesHelper, SpotLight, SpotLightHelper, Vector3 } from "three";
import useStore from "../hooks/useStore";
export const SpotLightMain = () => {
	const [{ x, y, z }, q] = useStore((s) => [
		s.playerPosition,
		s.playerQuaternion,
	]);
	const ref = useRef<SpotLight | undefined>();
	// useHelper(ref, SpotLightHelper, "white");
	const { scene } = useThree();
	if (ref.current) scene.add(ref.current?.target);
	useFrame(() => {
		ref.current?.target.position.copy(new Vector3(x, 0, z));
		// ref.current?.target.quaternion.copy(q);
		ref.current?.position.copy(new Vector3(x, 9.5, z + 5));
	});
	return (
		<>
			<spotLight
				ref={ref as any}
				castShadow
				intensity={0.95}
				position={[x, 9.5, z + 5]}
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-far={500}
				shadow-camera-near={0.01}
				shadow-camera-left={-100}
				shadow-camera-right={100}
				shadow-camera-top={100}
				shadow-camera-bottom={-100}
				decay={200}
				penumbra={1}
				angle={Math.PI / 6}
				shadow-radius={8}
			/>
		</>
	);
};
