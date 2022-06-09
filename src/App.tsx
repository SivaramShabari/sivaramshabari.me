import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AxesHelper, Vector3 } from "three";
import { Loader, OrbitControls } from "@react-three/drei";
import Ground from "./components/Ground";
import Text from "./components/Text";
import StreetLamp from "./components/StreetLamp";
import Character from "./components/Character";
import Wall from "./components/Wall";
import Roof from "./components/Roof";
import { SpotLightMain } from "./components/Lights";

function App() {
	return (
		<>
			<Canvas
				gl={{ antialias: true }}
				camera={{
					fov: 40,
					near: 0.01,
					far: 1000,
				}}
				shadows={true}
			>
				<color attach={"background"} args={[0, 0, 0]} />
				<ambientLight intensity={0.2} />
				{/* <primitive object={new AxesHelper(10)} /> */}
				<Roof />
				<Ground />
				<Wall
					position={new Vector3(-10, 5, 0)}
					rotation={new Vector3(0, Math.PI / 2, 0)}
				/>
				<Wall
					position={new Vector3(10, 5, 0)}
					rotation={new Vector3(0, -Math.PI / 2, 0)}
				/>
				<Text
					size={0.5}
					position={new Vector3(-7, 3, -17)}
					text="Hello!"
					thickness={0.2}
					blink
				/>
				<Text
					size={0.5}
					position={new Vector3(-7, 2, -17)}
					text="I'm Sivaram Shabari"
					thickness={0.2}
					blink
				/>
				<Text
					size={0.4}
					position={new Vector3(0, 1, -11)}
					text="I'm a Software developer"
					thickness={0.2}
				/>
				<Text
					size={0.3}
					position={new Vector3(-5, 3, -5)}
					text="Click on me to see my projects"
					thickness={0.2}
				/>
				<Text
					size={0.4}
					position={new Vector3(-7, 1, 1)}
					text="Click here to leave a message"
					thickness={0.2}
				/>
				<Suspense>
					<Character />
				</Suspense>
				<SpotLightMain />
			</Canvas>
		</>
	);
}

export default App;
