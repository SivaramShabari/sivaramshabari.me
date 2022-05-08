import { Bloom } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize } from "postprocessing";

export default function () {
	return (
		<Bloom
			intensity={1.0} // The bloom intensity.
			kernelSize={KernelSize.LARGE} // blur kernel size
			luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
			luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
		/>
	);
}
