import roboto_regular from "../fonts/Roboto_Regular.json";
import { extend, useFrame } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useMemo, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { MeshStandardMaterial, Vector3 } from "three";
extend({ TextGeometry });
type props = {
	text: string;
	size: number;
	position: Vector3;
	thickness: number;
	color?: string;
	font?: string;
	blink?: boolean;
};
const loader = new FontLoader();
const font = loader.parse(roboto_regular);
export default (props: props) => {
	const [emissiveIntensity, setEmissiveIntensity] = useState(1);
	const material = new MeshStandardMaterial({
		color: 0xaeaeae,
		roughness: 0,
		emissive: 0xffffff,
		emissiveIntensity,
	});
	useFrame((root) => {
		const time = root.clock.getElapsedTime();
		if (props.blink) setEmissiveIntensity((e) => Math.abs(Math.cos(time)));
		else setEmissiveIntensity(1);
	});
	const geometry = useMemo(
		() =>
			new TextGeometry(props.text, {
				font: font,
				size: props.size,
				height: props.thickness,
			}),
		[]
	);

	return (
		<mesh position={props.position} geometry={geometry} material={material} />
	);
};
