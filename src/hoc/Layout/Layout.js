import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componets/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
	const [showSideDrawer, setSideDrawer] = useState(false);
	// state = {
	// 	showSideDrawer: false,
	// };

	const sideDrawerClosedHandler = () => {
		setSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		// console.log('cliced side drawer');
		setSideDrawer(!showSideDrawer);
	};

	const { isAuthenticated, children } = props;
	return (
		<Aux>
			<Toolbar
				isAuth={isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={isAuthenticated}
				open={showSideDrawer}
				closed={sideDrawerClosedHandler}
			/>
			<main
				className={[classes.Content, showSideDrawer ? classes.Blur : ' '].join(
					' '
				)}
			>
				{children}
			</main>
		</Aux>
	);
};
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(Layout);
