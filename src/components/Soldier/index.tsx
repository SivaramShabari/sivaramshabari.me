import { useEffect, useRef, useState } from "react";
import { useFBX, useAnimations, useGLTF } from "@react-three/drei";
import { AnimationMixer, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboard } from "../../hooks/useKeyboard";
import useStore from "../../hooks/useStore";

export default function Model({ ...props }) {
	const ref = useRef<any>();
	const soldierPosition = useStore((state) => state.playerPosition);
	const [animationState, setAnimationState] = useState<{
		prev: "Idle" | "Walk";
		current: "Idle" | "Walk";
	}>({
		prev: "Idle",
		current: "Idle",
	});
	const input = useKeyboard();
	const { scene, nodes, materials, animations } = useGLTF(
		"src/assets/models/Soldier.glb"
	) as any;
	const { actions } = useAnimations(animations, ref);
	let mixer = new AnimationMixer(scene);

	useEffect(() => {
		if (actions.Walk && actions.Run && actions.Idle && actions.TPose) {
			const prevAction = actions[animationState.prev];
			if (input.ArrowUp || input.ArrowDown) {
				const walk = actions.Walk;
				if (animationState.current !== "Walk") {
					walk.time = 0;
					walk.enabled = true;
					walk.setEffectiveTimeScale(1);
					walk.setEffectiveWeight(1);
					walk.crossFadeFrom(prevAction!, 0.2, true);
					walk.play();
					setAnimationState({ current: "Walk", prev: "Walk" });
				}
			} else {
				const idle = actions.Idle;
				if (animationState.current !== "Idle") {
					idle.time = 0;
					idle.enabled = true;
					idle.setEffectiveTimeScale(1);
					idle.setEffectiveWeight(1);
					idle.crossFadeFrom(prevAction!, 0.2, true);
					idle.play();
					setAnimationState({ current: "Idle", prev: "Idle" });
				}
			}
		}
	}, [input]);
	useFrame((state, delta) => {
		mixer.update(delta);
	});
	return (
		<>
			<group
				ref={ref as any}
				position={[soldierPosition.x, 0, soldierPosition.z]}
				dispose={null}
			>
				<group name="Scene">
					<group name="Character" rotation={[-Math.PI / 2, 0, 0]} scale={0.02}>
						<primitive object={nodes.mixamorigHips} />
						<skinnedMesh
							castShadow
							name="vanguard_Mesh"
							geometry={nodes.vanguard_Mesh.geometry}
							material={materials.VanguardBodyMat}
							skeleton={nodes.vanguard_Mesh.skeleton}
						/>
						<skinnedMesh
							castShadow
							name="vanguard_visor"
							geometry={nodes.vanguard_visor.geometry}
							material={materials.Vanguard_VisorMat}
							skeleton={nodes.vanguard_visor.skeleton}
						/>
					</group>
				</group>
			</group>
		</>
	);
}

useGLTF.preload("/src/assets/models/Soldier.glb");
