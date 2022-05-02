import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Ground from "./components/Ground";
import { Debug, Physics } from "@react-three/cannon";
import { OrbitControls, Sky, softShadows } from "@react-three/drei";
import Player from "./components/Player";
import Soldier from "./components/Soldier";
import { FPVControls } from "./components/FPVControls";
import { useThree } from "@react-three/fiber";
import { PCFSoftShadowMap, Vector2 } from "three";
import { PointLight } from "./components/Lights";
import { useFBX } from "@react-three/drei";

function App() {
	useEffect(() => softShadows(), []);
	const pointLightRef = useRef<any>();
	const { scene, nodes, materials } = useFBX(
		"src/assets/models/room.fbx"
	) as any;
	return (
		<>
			<Canvas
				gl={{ antialias: true }}
				camera={{
					fov: 40,
					position: [0, 5, 5],
					near: 0.01,
					far: 1000,
				}}
				shadows={true}
			>
				{/* <FPVControls /> */}
				<ambientLight intensity={0.2} />
				<pointLight
					ref={pointLightRef}
					castShadow
					intensity={1}
					position={[0, 30, 0]}
					shadow-mapSize-width={2048}
					shadow-mapSize-height={2048}
					shadow-camera-far={500}
					shadow-camera-near={0.001}
					shadow-camera-left={-10}
					shadow-camera-right={10}
					shadow-camera-top={10}
					shadow-camera-bottom={-10}
					shadow-radius={7}
				/>
				{/* <PointLight /> */}
				{/* <OrbitControls /> */}
				<Sky sunPosition={[100, 20, 100]} />
				<Physics gravity={[0, -30, 0]}>
					{/* <Debug color="black" scale={1.1}> */}
					<Ground position={[0, 0, 0]} />
					<Suspense fallback={null}>
						<Soldier position={[0, 0, 0]} />
					</Suspense>
					<Player setCameraToPlayer position={[0, 0, 0]} />
					{/* </Debug> */}
				</Physics>
			</Canvas>
		</>
	);
}

export default App;
