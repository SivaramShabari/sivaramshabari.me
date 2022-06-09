import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
	BufferGeometry,
	LinearEncoding,
	Material,
	Mesh,
	RepeatWrapping,
	TextureLoader,
	Vector3,
} from "three";
import textureMap from "../assets/textures/Seamless_White_Brick_Texture.jpg";
import normalMap from "../assets/textures/Seamless_White_Brick_Texture_NORMAL.jpg";
import specularMap from "../assets/textures/Seamless_White_Brick_Texture.jpg";
type props = {
	position: Vector3;
	rotation: Vector3;
};
const texture = new TextureLoader().load(textureMap);
const normal = new TextureLoader().load(normalMap);
const specular = new TextureLoader().load(specularMap);

export default function Wall(props: props) {
	const plane = useRef<Mesh<BufferGeometry, Material | Material[]>>();

	console.log("Wall textures:", normal, specular, texture);

	useEffect(() => {
		if (plane.current) {
			plane.current.position.set(
				props.position.x,
				props.position.y,
				props.position.z
			);
			plane.current.rotation.set(
				props.rotation.x,
				props.rotation.y,
				props.rotation.z
			);
		}
	}, [plane]);
	useEffect(() => {
		[normal, texture].forEach((t) => {
			t.wrapS = RepeatWrapping;
			t.wrapT = RepeatWrapping;
			t.repeat.set(4, 2);
			t.offset.set(0, 0);
		});
		normal.encoding = LinearEncoding;
	}, [normal, texture]);
	return (
		<>
			<mesh ref={plane as any}>
				<planeGeometry attach="geometry" args={[50, 10]} />
				<meshPhongMaterial
					normalMap={normal}
					dithering={true}
					color={[0.28, 0.27, 0.2]}
					map={texture}
					specularMap={specular}
					reflectivity={1}
					shininess={90}
				/>
				{/* <MeshReflectorMaterial
					envMapIntensity={0}
					normalMap={normal}
					map={texture}
					dithering={true}
					// color={[0.02, 0.02, 0.02]}
					roughness={10}
					blur={[1000, 400]}
					mixBlur={300}
					mixStrength={80}
					mixContrast={1}
					resolution={1024}
					mirror={0}
					depthScale={0.01}
					minDepthThreshold={0.9}
					maxDepthThreshold={1}
					reflectorOffset={0.92}
				/> */}
			</mesh>
		</>
	);
}
