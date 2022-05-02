import { Vector2 } from "three";

export const PointLight = () => {
	return (
		<pointLight
			shadow={{
				bias: 0.001,
				mapSize: new Vector2(2048, 2048),
			}}
			castShadow
			intensity={1}
			position={[0, 50, 0]}
		/>
	);
};
