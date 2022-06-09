import { MeshReflectorMaterial, Reflector } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
import textureMap from "../assets/textures/Road_Texture.jpg";
import normalMap from "../assets/textures/terrain-normal.jpg";
import roughnessMap from "../assets/textures/terrain-roughness.jpg";

const texture = new TextureLoader().load(textureMap);
const normal = new TextureLoader().load(normalMap);
const roughness = new TextureLoader().load(roughnessMap);
[normal, roughness].forEach((t) => {
	t.wrapS = RepeatWrapping;
	t.wrapT = RepeatWrapping;
	t.repeat.set(5, 5);
	t.offset.set(0, 0);
});
texture.rotation = Math.PI / 2;
normal.encoding = LinearEncoding;
function Ground() {
	const plane = useRef<any>();
	useEffect(() => {
		if (plane.current) plane.current.rotation.x = -Math.PI / 2;
	}, [plane]);

	return (
		<>
			<mesh ref={plane} receiveShadow>
				<planeGeometry attach="geometry" args={[30, 50]} />
				<MeshReflectorMaterial
					envMapIntensity={0}
					normalMap={normal}
					roughnessMap={roughness}
					dithering={true}
					color={[0.02, 0.02, 0.02]}
					roughness={0.1}
					blur={[1000, 400]}
					mixBlur={30}
					mixStrength={80}
					mixContrast={1}
					resolution={1024}
					mirror={0}
					depthScale={0.01}
					minDepthThreshold={0.9}
					maxDepthThreshold={1}
					reflectorOffset={0.2}
				/>
			</mesh>
		</>
	);
}

export default Ground;
