import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";

export default function Roof() {
	const roof = useRef<Mesh<BufferGeometry, Material | Material[]>>();
	useEffect(() => {
		if (roof.current) {
			roof.current.position.set(0, 10, 0);
			roof.current.rotation.set(Math.PI / 2, 0, 0);
		}
	});
	return (
		<mesh ref={roof as any}>
			<planeBufferGeometry attach="geometry" args={[30, 50]} />
			<meshStandardMaterial attach="material" color={0x333333} />
		</mesh>
	);
}
