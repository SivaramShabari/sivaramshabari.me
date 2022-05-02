import { Vector3 } from "three";
import create from "zustand";


export default create((set) => ({
    playerPosition: new Vector3(0, 0, 0),
    setPlayerPosition: (position) => set((state) => {
        return {
            ...state,
            playerPosition: position
        }
    })

}));


