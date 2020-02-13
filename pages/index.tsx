import React, { ReactNode, useState } from "react";
import { Canvas } from "react-three-fiber";
import { useSpring } from "react-spring/three";

const Box = () => {
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState(false);
	const props = useSpring({
		scale: active ? [1.5, 1, 1.5] : [1, 1, 1],
		color: hover ? "green" : "blue",
	});
	return (
		<mesh
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
			onClick={() => setActive(!active)}
			scale={props.scale}
		>
			<boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
			<meshBasicMaterial attach="material" color={props.color} />
		</mesh>
	);
};

export default (): ReactNode => (
	<>
		<Canvas>
			<Box />
		</Canvas>
	</>
);
