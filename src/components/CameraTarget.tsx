import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import useStore from "../hooks/useStore";

const CameraTarget = ({ ...props }) => {
	const { camera } = useThree();
	const [playerPosition] = useStore((s) => [s.playerPosition]);
	const xOffsetFromCamera = -1.5;
	const yOffsetFromCamera = 0.8;
	const zOffsetFromCamera = 10;
	const xTarget = playerPosition.x + xOffsetFromCamera;
	const yTarget = yOffsetFromCamera;
	const zTarget = playerPosition.z + zOffsetFromCamera;
	const targetPosition = new Vector3(xTarget, yTarget, zTarget);
};

export default CameraTarget;
