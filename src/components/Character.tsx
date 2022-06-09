import { useFBX } from "@react-three/drei";
import { AnimationMixer, LoopOnce, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useInput } from "../hooks/useInput";
import { useEffect, useMemo, useState } from "react";
import useStore from "../hooks/useStore";
export default function Model({ ...props }) {
	const model = useMemo(() => useFBX("src/assets/models/Alex.fbx"), []);
	const idle = useMemo(() => useFBX("src/assets/models/idle.fbx"), []);
	const walk = useMemo(() => useFBX("src/assets/models/walk.fbx"), []);
	const walkB = useMemo(() => useFBX("src/assets/models/walk_back.fbx"), []);
	const run = useMemo(() => useFBX("src/assets/models/run.fbx"), []);
	const dance = useMemo(() => useFBX("src/assets/models/dance_1.fbx"), []);
	const mixer = useMemo(() => new AnimationMixer(model), []);
	const idleAction = useMemo(() => mixer.clipAction(idle.animations[0]), []);
	const walkAction = useMemo(() => mixer.clipAction(walk.animations[0]), []);
	const wBackAction = useMemo(() => mixer.clipAction(walkB.animations[0]), []);
	const runAction = useMemo(() => mixer.clipAction(run.animations[0]), []);
	const d1Action = useMemo(() => mixer.clipAction(dance.animations[0]), []);
	const input = useStore((state) => state.input);
	const position = useStore((state) => state.playerPosition);
	const quaternion = useStore((state) => state.playerQuaternion);
	const [state, set] = useState({
		prev: { name: "idle", action: idleAction },
		current: { name: "idle", action: idleAction },
	});
	useInput();
	useEffect(() => {
		idleAction.play();
		model.castShadow = true;
		model.children.forEach((child) => {
			child.castShadow = true;
		});
	}, []);

	useEffect(() => {
		if (input.front) {
			if (input.sprint) {
				set((s) => ({
					prev: s.current,
					current: { name: "run", action: runAction },
				}));
			} else {
				set((s) => ({
					prev: s.current,
					current: { name: "walk", action: walkAction },
				}));
			}
		} else if (input.back) {
			set((s) => ({
				prev: s.current,
				current: { name: "back", action: wBackAction },
			}));
		} else if (input.shoot) {
			set((s) => ({
				prev: s.current,
				current: { name: "dance", action: d1Action },
			}));
		} else {
			if (state.current.name !== "dance")
				set((s) => ({
					prev: s.current,
					current: { name: "idle", action: idleAction },
				}));
		}
	}, [input]);

	useEffect(() => {
		if (
			state.prev.name !== state.current.name &&
			state.current.name !== "dance"
		) {
			state.current.action.time = 0;
			state.current.action.enabled = true;
			state.current.action.setEffectiveTimeScale(1);
			state.current.action.setEffectiveWeight(1);
			state.current.action.crossFadeFrom(state.prev.action, 0.5, true);
			state.current.action.play();
		}
		if (state.current.name === "dance") {
			state.current.action.enabled = true;
			state.current.action.setEffectiveTimeScale(1.5);
			state.current.action.setEffectiveWeight(1);
			state.prev.action.fadeOut(0.5);
			state.current.action.play();
		}
	}, [state]);

	useFrame((_, delta) => {
		mixer.update(delta);
		model.quaternion.copy(quaternion);
		model.position.copy(new Vector3(position.x, position.y - 1, position.z));
	});

	return <primitive scale={0.025} object={model} />;
}

useFBX.preload("src/assets/models/Alex.fbx");
useFBX.preload("src/assets/models/idle.fbx");
useFBX.preload("src/assets/models/walk.fbx");
useFBX.preload("src/assets/models/run.fbx");
useFBX.preload("src/assets/models/walk_back.fbx");
