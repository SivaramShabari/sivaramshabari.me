import { usePlane } from "@react-three/cannon";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import {
	Color,
	IcosahedronGeometry,
	Mesh,
	MeshBasicMaterial,
	PCFSoftShadowMap,
	RectAreaLight,
} from "three";

function InfoCard() {
	const { gl, scene } = useThree();
	gl.setClearColor(0x000000, 1);
	gl.shadowMap.enabled = true;
	gl.shadowMap.type = PCFSoftShadowMap;
	gl.shadowMap.needsUpdate = true;
	const [ref] = usePlane(() => ({ rotation: [-0, 0, 0] }));

	return (
		<>
			<mesh ref={ref as any} castShadow receiveShadow>
				<planeGeometry attach="geometry" args={[5, 8]} />
				<meshStandardMaterial
					attach="material"
					color={0xffffff}
					emissive={0xffffff}
				/>
			</mesh>
			<rectAreaLight position={[0, 10, -10]}></rectAreaLight>
		</>
	);
}

export default InfoCard;
