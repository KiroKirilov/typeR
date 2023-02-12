import React, { useState } from "react";

import styles from "./Timer.module.scss";

type Props = {
	timerIsStarted: boolean;

	timerTime: number;
	setTimerTime: React.Dispatch<React.SetStateAction<number>>;
	setTimerIsDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer = (props: Props) => {
	const { timerTime, setTimerTime, timerIsStarted, setTimerIsDone } = props;

	if (timerIsStarted) {
		setTimeout(() => {
			setTimerTime((prev: number) => {
				return prev - 1;
			});

			if (timerTime === 0) {
				setTimerIsDone(true);
			}
		}, 1000);
	}
	return <div className={styles.timer}>00:{timerTime}</div>;
};

export default Timer;
