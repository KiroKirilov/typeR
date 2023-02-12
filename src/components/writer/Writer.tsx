import React, { useEffect, useState } from "react";
import useWriter from "../../hoods/useWriter";

import styles from "./Writer.module.scss";

type Props = {
	words: any[];
	wordIndex: number;
	letterIndex: number;

	handleKeyUp: (e: KeyboardEvent) => void;
	handleKeyDown: (e: KeyboardEvent) => void;

	timerIsStarted: boolean;
	setTimerIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Writer = (props: Props) => {
	const { words, wordIndex, letterIndex } = props;
	const { handleKeyUp, handleKeyDown } = props;
	const { timerIsStarted, setTimerIsStarted } = props;

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("keyup", handleKeyDown);
		};
	}, [handleKeyUp, handleKeyDown]);

	return (
		<div className={styles.writerContainer}>
			<div className={styles.wordsList}>
				{words.map((word: string[], wi: number) => (
					<div key={wi} className={styles.word}>
						{word.map((letter: any, li) => (
							<>
								{wi === wordIndex && li === letterIndex && (
									<span className={styles.cursor}></span>
								)}
								<div
									key={li}
									className={`${styles.letter} ${
										styles[letter.value]
									}`}
								>
									{letter.key}
								</div>
							</>
						))}
						{wi === wordIndex &&
							letterIndex === words[wordIndex].length && (
								<span className={styles.cursor}></span>
							)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Writer;
