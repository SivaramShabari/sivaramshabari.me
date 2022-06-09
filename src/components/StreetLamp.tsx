import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default () => {
	const lamp = useLoader(OBJLoader, "src/assets/street-lamp/lamp.obj");
	return <primitive object={lamp} />;
};
