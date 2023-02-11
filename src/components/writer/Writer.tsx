import React, { useEffect, useState } from "react";

import styles from "./Writer.module.scss";

type Props = {};

const Writer = (props: Props) => {
	const [writtenText, setWrittenText] = useState<string>("");
	const [charsTyped, setCharsTyped] = useState<number>(0);
	const [shiftIsPressed, setShiftIsPressed] = useState<boolean>(false);

	const exampleWords: string =
		"The sun was shining brightly on the small town of Millfield. People were out and about, enjoying the beautiful weather. Children were playing in the park, while others were sitting on the benches, soaking up the sun. The air was filled with the sound of laughter and chatter, and the sweet smell of freshly cut grass. As the day went on, the town buzzed with activity and energy, a testament to the joy that comes from living in such a tight-knit community.";
	const [words, setWords] = useState<any[]>(
		exampleWords.split(" ").map((w) => {
			return w.split("").map((l) => {
				return { key: l, value: "gray" };
			});
		})
	);

	const [wordIndex, setWordIndex] = useState<number>(0);
	const [letterIndex, setLetterIndex] = useState<number>(0);

	const updateLetterColor = (
		color: string,
		index: number = letterIndex
	): void => {
		setWords((prev: any) => {
			const newWords = [...prev];
			newWords[wordIndex][index] = {
				...newWords[wordIndex][index],
				value: color,
			};

			return newWords;
		});
	};

	const deleteLetter = (): void => {
		setWrittenText((prev: string) => {
			return prev.substring(0, prev.length - 1);
		});

		updateLetterColor("gray", letterIndex - 1);

		setLetterIndex((prev: number) => {
			return Math.max(prev - 1, 0);
		});
	};

	const moveToNextWord = (): void => {
		setWords((prev) => {
			const newWords = [...prev];
			newWords[wordIndex].map((l: any) => {
				if (l.value === "gray") {
					l.value = "red";
				}

				return l;
			});

			return newWords;
		});

		setWordIndex((prev: number) => prev + 1);
		setLetterIndex(0);
	};

	const inputLetter = (pressedKey: string): void => {
		if (shiftIsPressed) {
			pressedKey = pressedKey.toUpperCase();
		}

		setCharsTyped((prev: number) => prev + 1);

		setWrittenText((prev: string) => {
			const newWrittenText: string = prev + pressedKey;
			return newWrittenText.substring(0, words[wordIndex].length);
		});

		if (words[wordIndex][letterIndex].key === pressedKey) {
			updateLetterColor("green");
		} else {
			updateLetterColor("red");
		}

		setLetterIndex((prev: number) => prev + 1);
	};

	const handleKeyUp = (e: KeyboardEvent): void => {
		const pressedKey: string = e.key.toLocaleLowerCase();
		const pressedKeyCode: string = e.code.toLocaleLowerCase();

		if (pressedKey === "backspace") {
			deleteLetter();
			return;
		}

		if (pressedKeyCode === "space") {
			moveToNextWord();
			return;
		}

		if (pressedKey === "shift") {
			setShiftIsPressed(false);
			return;
		}

		inputLetter(pressedKey);
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		const pressedKey: string = e.key.toLocaleLowerCase();

		if (pressedKey === "shift") {
			setShiftIsPressed(true);
		}
	};

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
					</div>
				))}
			</div>
		</div>
	);
};

export default Writer;
