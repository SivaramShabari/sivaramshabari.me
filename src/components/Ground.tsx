import { usePlane } from "@react-three/cannon";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
	AxesHelper,
	MeshStandardMaterial,
	PCFSoftShadowMap,
	PlaneBufferGeometry,
	RepeatWrapping,
	TextureLoader,
} from "three";
import wood from "../assets/textures/floor/color.jpg";
import normal from "../assets/textures/floor/normal.jpg";
const texture = new TextureLoader().load(wood);
const normalMap = new TextureLoader().load(normal);
texture.repeat.set(80, 50);
normalMap.repeat.set(80, 50);
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
normalMap.wrapS = RepeatWrapping;
normalMap.wrapT = RepeatWrapping;
const planeBufferGeometry = new PlaneBufferGeometry(500, 500);
const meshStandardMaterial = new MeshStandardMaterial({
	roughness: 0.01,
	color: 0xffffff,
	metalness: 0.5,
});
function Ground(props: any) {
	const { gl } = useThree();
	gl.setClearColor(0x000000, 1);
	gl.shadowMap.enabled = true;
	gl.shadowMap.type = PCFSoftShadowMap;
	gl.shadowMap.needsUpdate = true;
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, 0, 0],
	}));
	return (
		<mesh
			ref={ref as any}
			geometry={planeBufferGeometry}
			material={meshStandardMaterial}
			castShadow
			receiveShadow
		></mesh>
	);
}

export default Ground;
