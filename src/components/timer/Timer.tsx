import React, { useEffect, useState } from "react";

import styles from "./Timer.module.scss";

interface ITimerProps {
	timerIsStarted: boolean;

	timerTime: number;
	setTimerTime: React.Dispatch<React.SetStateAction<number>>;
	setTimerIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = (props: ITimerProps) => {
	const { timerTime, setTimerTime, timerIsStarted, setTimerIsDone } = props;

	useEffect(() => {
		if (timerIsStarted) {
			const timerInterval = setInterval(() => {
				setTimerTime((prev: number) => {
					const newTimerTime = prev - 1;

					if (newTimerTime === 0) {
						setTimerIsDone(true);
						clearInterval(timerInterval);
					}

					return newTimerTime;
				});
			}, 1000);
		}
	}, [timerIsStarted]);

	return (
		<div className={styles.timer}>
			00:{timerTime.toString().padStart(2, "0")}
		</div>
	);
};

export default Timer;
