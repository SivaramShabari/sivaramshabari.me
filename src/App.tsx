import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Ground from "./components/Ground";
import { Physics } from "@react-three/cannon";
import { PointLightMain, SpotLightMain } from "./components/Lights";
import Character from "./components/Character";
import { Joystick } from "react-joystick-component";
import useStore from "./hooks/useStore";
import Player from "./components/Player";
import { Vector3 } from "three";
import { GiCrosshair } from "react-icons/gi";
import OrbitControls from "./components/OrbitControls";
import Ball from "./components/Ball";
let audio: any;
audio = new Audio("src/assets/happier2.mp3");
function App() {
	const array = useMemo(
		() =>
			Array.from({ length: 20 }, () => [
				getRandomInt(-10, 10),
				getRandomInt(2, 6),
				getRandomInt(-10, 10),
			]),
		[]
	);
	const [input, setInput, { x, y, z }, isCameraLocked, lockCamera] = useStore(
		(s) => [
			s.input,
			s.setInput,
			s.playerPosition,
			s.isCameraLocked,
			s.setIsCameraLocked,
		]
	);
	const [play, setplay] = useState(false);
	useEffect(() => {
		if (audio) {
			audio.volume = 0.8;
			if (play) {
				audio.play();
			} else {
				audio.pause();
			}
		}
	}, [play]);
	useEffect(() => {
		return () => {
			audio = null;
		};
	}, []);
	return (
		<>
			<div
				style={{ pointerEvents: "none" }}
				className="z-20 fixed justify-center items-center flex gap-3 h-screen w-screen"
			>
				<GiCrosshair size={36} className="text-white font-thin hidden" />
			</div>
			<div
				style={{ pointerEvents: "none" }}
				className="z-10 fixed justify-center items-center flex gap-3 h-screen w-screen"
			>
				<div
					style={{ pointerEvents: "all" }}
					className="form-control absolute top-5 right-8 z-20"
				>
					<label className="label cursor-pointer">
						<span className="mr-2 label-text font-bold text-primary">
							Lock Camera
						</span>
						<input
							type="checkbox"
							className="toggle toggle-primary"
							checked={isCameraLocked}
							onChange={(e) => lockCamera(e.target.checked)}
						/>
					</label>
				</div>
				<div
					style={{ pointerEvents: "all" }}
					className="form-control absolute top-5 left-8 z-20"
				>
					<label className="label cursor-pointer">
						<span className="mr-2 label-text font-bold text-primary">
							Music
						</span>
						<input
							type="checkbox"
							className="toggle toggle-primary"
							checked={play}
							onChange={(e) => setplay(e.target.checked)}
						/>
					</label>
				</div>
				<div className="absolute bottom-20 left-2"></div>
				<div
					style={{ pointerEvents: "all" }}
					className="btn btn-primary absolute top-20 right-8 z-20"
					onClick={() => {
						setInput({
							front: false,
							back: false,
							sprint: false,
							left: false,
							right: false,
							jump: false,
							shoot: true,
						});
					}}
				>
					Dance
				</div>
				<div
					style={{ pointerEvents: "all" }}
					className="absolute bottom-10 mb-16 opacity-80 "
				>
					<Joystick
						size={100}
						baseColor="#999999"
						stickColor="#99cccc"
						move={(e) => {
							const x = e.x || 0;
							const y = e.y || 0;
							setInput({
								...input,
								front: y > 7,
								back: y < -5,
								sprint: y > 45,
								left: x < -15,
								right: x > 15,
							});
						}}
						stop={(e) => {
							setInput({
								front: false,
								back: false,
								sprint: false,
								left: false,
								right: false,
								jump: false,
								shoot: false,
							});
						}}
						throttle={50}
					></Joystick>
				</div>
				<div className="absolute bottom-2 left-4 text-xs text-white">
					<code>
						<div>w a s d | ↑ ↓ → ← Move</div>
						<div>Ctrl - Dance</div>
						<div>Shift - Sprint</div>
						<div>Space - Jump</div>
					</code>
				</div>
			</div>

			<Canvas
				gl={{ antialias: true }}
				camera={{
					fov: 40,
					near: 0.01,
					far: 1000,
					position: new Vector3(x + 25, 29, z - 19),
				}}
				color={"0x000000"}
				shadows={true}
			>
				<PointLightMain intensity={0.1} />
				<SpotLightMain />
				<ambientLight intensity={0.1} />
				{!isCameraLocked && <OrbitControls />}
				<Physics gravity={[0, -30, 0]}>
					{" "}
					<Ground />
					<Player />
					{array.map(([x, y, z], i) => (
						<Ball key={i} x={x} y={y} z={z} />
					))}
					{/* <InfoCard /> */}
				</Physics>
				<Suspense>
					<Character />
				</Suspense>

				{/* <BloomPass /> */}
			</Canvas>
		</>
	);
}

export default App;

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
