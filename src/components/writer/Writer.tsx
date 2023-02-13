import React, { useEffect, useRef, useState } from "react";
import useWriter from "../../hooks/useWriter";
import { WORDS_PER_PAGE } from "../utils/constants";

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

	const cursor = useRef<HTMLElement>(null);

	const [wordsPageNumber, setWordsPageNumber] = useState<number>(0);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("keyup", handleKeyDown);
		};
	}, [handleKeyUp, handleKeyDown]);

	useEffect(() => {
		if (wordIndex > 0 && wordIndex % WORDS_PER_PAGE === 0) {
			setWordsPageNumber((prev: number) => {
				return prev + 1;
			});
		}
	}, [wordIndex]);

	return (
		<div className={styles.writerContainer}>
			<div className={styles.wordsList}>
				{words &&
					words.length > 0 &&
					words
						.slice(
							wordsPageNumber * WORDS_PER_PAGE,
							wordsPageNumber * WORDS_PER_PAGE + WORDS_PER_PAGE
						)
						.map((word: string[], wi: number) => (
							<div key={wi} className={styles.word}>
								{word.map((letter: any, li) => (
									<>
										{wi === wordIndex &&
											li === letterIndex && (
												<span
													className={styles.cursor}
													ref={cursor}
												></span>
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
										<span
											className={styles.cursor}
											ref={cursor}
										></span>
									)}
							</div>
						))}
			</div>
		</div>
	);
};

export default Writer;
