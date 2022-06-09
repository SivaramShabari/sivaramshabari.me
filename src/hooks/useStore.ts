import { Quaternion, Vector3 } from "three";
import create from "zustand";

export interface IBullet {
	position: Vector3;
	velocity: Vector3;
	state: "alive" | "dead";
}
export class Bullet implements IBullet {
	constructor(position: Vector3, velocity: Vector3) {
		this.position = position;
		this.velocity = velocity;
		this.state = "alive";
		setTimeout(() => {
			console.log("bullet is dead");
			this.state = "dead";
		}, 1000);
	}

	position: Vector3;
	velocity: Vector3;
	state: "alive" | "dead";
}
export type Input = {
	front: boolean;
	back: boolean;
	sprint: boolean;
	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;
};
interface State {
	playerPosition: Vector3;
	setPlayerPosition: (position: Vector3) => void;
	input: Input;
	setInput: (input: Input) => void;
	pointerDirection: Vector3;
	setPointerDirection: (direction: Vector3) => void;
	playerQuaternion: Quaternion;
	setPlayerQuaternion: (quaternion?: Quaternion) => void;
	bullets: Array<IBullet>;
	addBullet: (bullet: IBullet) => void;
	isCameraLocked: boolean;
	setIsCameraLocked: (isCameraLocked: boolean) => void;
}

const useStore = create<State>((set) => ({
	playerPosition: new Vector3(0, 0, 20),
	setPlayerPosition: (position) =>
		set((state) => {
			return {
				...state,
				playerPosition: position,
			};
		}),
	input: {
		front: false,
		back: false,
		sprint: false,
		left: false,
		right: false,
		jump: false,
		shoot: false,
	},
	setInput: (input: Input) =>
		set((state) => {
			return {
				input: input,
			};
		}),

	pointerDirection: new Vector3(0, 0, 0),
	setPointerDirection: (direction: Vector3) =>
		set((state) => {
			return {
				...state,
				pointerDirection: direction,
			};
		}),
	playerQuaternion: new Quaternion(),
	setPlayerQuaternion: (quaternion?: Quaternion) =>
		set((state) => {
			if (quaternion)
				return {
					...state,
					playerQuaternion: quaternion,
				};
		}),
	bullets: [],
	addBullet: (bullet: IBullet) => {
		set((state) => {
			console.log("setBullets", state.bullets);
			return {
				...state,
				bullets: [...state.bullets, bullet],
			};
		});
	},
	isCameraLocked: false,
	setIsCameraLocked: (isCameraLocked: boolean) =>
		set((state) => {
			return {
				...state,
				isCameraLocked: isCameraLocked,
			};
		}),
}));

export default useStore;
