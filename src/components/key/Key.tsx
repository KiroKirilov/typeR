import React from "react";

import styles from "./Key.module.scss";

type Props = {
	letter: string;
	pressedKeys: string[];
};

const Key = (props: Props) => {
	const { letter, pressedKeys } = props;

	return (
		<div
			className={`${styles.key} ${
				pressedKeys.includes(letter) ? styles.pressed : ""
			}`}
		>
			{letter}
		</div>
	);
};

export default Key;
