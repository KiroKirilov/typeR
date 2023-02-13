import React from "react";

import styles from "./Header.module.scss";

interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
	return (
		<div className={styles.header}>
			<span>typeR</span>
		</div>
	);
};

export default Header;
