import { usePlane } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { PCFSoftShadowMap, RepeatWrapping, TextureLoader } from "three";
import grass from "../assets/textures/grass.jpg";
function Ground(props: any) {
	const { gl } = useThree();
	gl.shadowMap.enabled = true;
	gl.shadowMap.type = PCFSoftShadowMap;
	gl.shadowMap.needsUpdate = true;
	const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
	const texture = new TextureLoader().load(grass);
	texture.wrapS = texture.wrapT = RepeatWrapping;
	texture.repeat.set(100, 100);
	return (
		<mesh ref={ref as any} castShadow receiveShadow>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial attach="material" map={texture} color="white" />
		</mesh>
	);
}

export default Ground;
