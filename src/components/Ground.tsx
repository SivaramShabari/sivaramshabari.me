import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import {
	LinearEncoding,
	PlaneBufferGeometry,
	RepeatWrapping,
	TextureLoader,
} from "three";
// import textureMap from "../assets/textures/Road_Texture.jpg";
// import normalMap from "../assets/textures/terrain-normal.jpg";
// import roughnessMap from "../assets/textures/terrain-roughness.jpg";

const planeBufferGeometry = new PlaneBufferGeometry(60, 50);
// const normal = new TextureLoader().load(normalMap);
// const roughness = new TextureLoader().load(roughnessMap);
// [normal, roughness].forEach((t) => {
// 	t.wrapS = RepeatWrapping;
// 	t.wrapT = RepeatWrapping;
// 	t.repeat.set(3, 3);
// 	t.offset.set(0, 0);
// });
// texture.rotation = Math.PI / 2;
// normal.encoding = LinearEncoding;
function Ground(props: any) {
	const { gl } = useThree();
	const canvas = gl.domElement;
	useEffect(() => {
		canvas.addEventListener(
			"webglcontextlost",
			function (event: any) {
				event.preventDefault();
				setTimeout(function () {
					gl.forceContextRestore();
				}, 1);
			},
			false
		);
	}, []);
	gl.setClearColor(0x000000, 1);
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, 0, 0],
	}));
	return (
		<mesh
			ref={ref as any}
			geometry={planeBufferGeometry}
			castShadow
			receiveShadow
		>
			<MeshReflectorMaterial
				envMapIntensity={0}
				dithering={false}
				color={[0.02, 0.02, 0.02]}
				roughness={0.8}
				blur={[1000, 400]}
				mixBlur={30}
				mixStrength={80}
				mixContrast={1}
				resolution={300}
				mirror={0}
				depthScale={0.01}
				minDepthThreshold={0.9}
				maxDepthThreshold={1}
				reflectorOffset={0.2}
			/>
		</mesh>
	);
}

export default Ground;
