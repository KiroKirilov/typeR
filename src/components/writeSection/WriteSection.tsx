import React, { KeyboardEvent, useEffect, useState } from "react";
import WordsHelper from "../../helpers/WordsHelper";
import useWriter from "../../hooks/useWriter";
import Keyboard from "../keyboard/Keyboard";
import ResultsSection from "../resultsSection/ResultsSection";
import Timer from "../timer/Timer";
import Writer from "../writer/Writer";

import styles from "./WriteSection.module.scss";

type Props = {};

const WriteSection = (props: Props) => {
	const [timerIsStarted, setTimerIsStarted] = useState<boolean>(false);
	const [timerIsDone, setTimerIsDone] = useState<boolean>(false);

	const [timerTime, setTimerTime] = useState<number>(30);

	const {
		words,
		setWords,
		wordIndex,
		letterIndex,
		handleKeyUp,
		handleKeyDown,
	} = useWriter(timerIsStarted, setTimerIsStarted);

	useEffect(() => {
		const generatedWords: any[] = WordsHelper.getRandomWords();
		setWords(generatedWords);
	}, []);
	return (
		<>
			{!timerIsDone && (
				<>
					<Timer
						timerIsStarted={timerIsStarted}
						timerTime={timerTime}
						setTimerTime={setTimerTime}
						setTimerIsDone={setTimerIsDone}
					/>

					<Writer
						handleKeyUp={handleKeyUp}
						handleKeyDown={handleKeyDown}
						words={words}
						wordIndex={wordIndex}
						letterIndex={letterIndex}
						timerIsStarted={timerIsStarted}
						setTimerIsStarted={setTimerIsStarted}
					/>

					<Keyboard />
				</>
			)}

			{timerIsDone && <ResultsSection />}
		</>
	);
};

export default WriteSection;
