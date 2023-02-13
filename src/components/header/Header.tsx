import React from "react";

import styles from "./Header.module.scss";

type Props = {};

const Header = (props: Props) => {
	return (
		<div className={styles.header}>
			<span>typeR</span>
		</div>
	);
};

export default Header;
