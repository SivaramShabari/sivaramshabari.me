interface IState {
	enter(prev: StateType): void;
	update(): void;
	exit(): void;
}
type StateType = {
	[key: string]: IState;
};

class State implements IState {
	public enter(prev: StateType) {}
	public update() {}
	public exit() {}
}
export class Walk extends State {
	get Name() {
		return "Walk";
	}
	public enter(previousState: StateType) {}
	public update(): void {}
	public exit(): void {}
}
