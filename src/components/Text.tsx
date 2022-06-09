import roboto_regular from "../assets/fonts/Roboto_Regular.json";
import { extend, useFrame } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useMemo, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { MeshStandardMaterial, Vector3 } from "three";
import { useBox } from "@react-three/cannon";
extend({ TextGeometry });
type props = {
	text: string;
	size: number;
	position: Vector3;
	thickness: number;
	color?: string;
	font?: string;
	blink?: boolean;
	onClick?: () => void;
};
const loader = new FontLoader();
const font = loader.parse(roboto_regular);
export default (props: props) => {
	const material = new MeshStandardMaterial({
		color: 0x009999,
		roughness: 0,
		emissive: 0x00ffff,
		emissiveIntensity: 1,
	});
	useFrame((root) => {
		const time = root.clock.getElapsedTime();
		// if (props.blink) setEmissiveIntensity((e) => Math.abs(Math.cos(time)));
		// else setEmissiveIntensity(1);
	});
	const [ref, api] = useBox(() => ({
		mass: 0.02,
		position: [props.position.x, props.position.y, props.position.z],
		args: [props.text.length, props.size, props.thickness * 2],
		collisionResponse: true,
	}));
	const geometry = useMemo(
		() =>
			new TextGeometry(props.text, {
				font: font,
				size: props.size * 1.2,
				height: props.thickness / 1.6,
			}),
		[]
	);

	return (
		<mesh
			onClick={props.onClick}
			onPointerEnter={(e) => e.object.scale.set(1.1, 1.1, 1.1)}
			onPointerLeave={(e) => e.object.scale.set(1, 1, 1)}
			ref={ref as any}
			position={props.position}
			geometry={geometry}
			material={material}
		/>
	);
};
