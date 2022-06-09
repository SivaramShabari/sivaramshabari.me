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
export type loading = {
	character: boolean;
	textures: boolean;
};
interface State {
	playerPosition: Vector3;
	setPlayerPosition: (position: Vector3) => void;
	addPlayerPosition: (position: Vector3) => void;
	input: Input;
	setInput: (input: Input) => void;
	playerQuaternion: Quaternion;
	setPlayerQuaternion: (quaternion?: Quaternion) => void;
	loading: loading;
	setLoading: (loading: loading) => void;
}

const useStore = create<State>((set) => ({
	playerPosition: new Vector3(0, 0, -16),
	setPlayerPosition: (position) =>
		set((state) => {
			return {
				...state,
				playerPosition: position,
			};
		}),
	addPlayerPosition: (position) =>
		set((state) => {
			const x = state.playerPosition.x + position.x;
			const y = state.playerPosition.y + position.y;
			const z = state.playerPosition.z + position.z;
			return {
				...state,
				playerPosition: new Vector3(x, y, z),
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
	playerQuaternion: new Quaternion(),
	setPlayerQuaternion: (quaternion?: Quaternion) =>
		set((state) => {
			if (quaternion)
				return {
					...state,
					playerQuaternion: quaternion,
				};
		}),
	loading: {
		character: true,
		textures: true,
	},
	setLoading: (loading: loading) =>
		set((state) => {
			return {
				loading: loading,
			};
		}),
}));

export default useStore;
