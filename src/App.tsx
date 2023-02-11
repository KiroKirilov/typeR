import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Keyboard from "./components/keyboard/Keyboard";

import styles from "./App.module.scss";
import Writer from "./components/writer/Writer";
import Header from "./components/header/Header";

function App() {
	return (
		<div className={styles.App}>
			<Header />
			<Writer />
			<Keyboard />
		</div>
	);
}

export default App;
