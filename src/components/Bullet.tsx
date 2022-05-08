import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

function Bullet({ ...props }) {
	const [ref, api] = useSphere(() => ({
		mass: 10,
		type: "Dynamic",
		position: [
			props.position.x + 1,
			props.position.y + 2,
			props.position.z + 1,
		],
	}));
	useFrame(() => {
		api.velocity.set(
			props.velocity.x - 2,
			props.velocity.y,
			props.velocity.z - 12
		);
	});
	return (
		<>
			<mesh ref={ref as any}>
				<sphereBufferGeometry attach="geometry" args={[0.3, 32, 32]} />
				<meshStandardMaterial attach="material" color="red" />
			</mesh>
		</>
	);
}

export default Bullet;
