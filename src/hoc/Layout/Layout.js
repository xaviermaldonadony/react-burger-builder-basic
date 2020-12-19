import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../componets/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		console.log('cliced side drawer');
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main
					className={[
						classes.Content,
						this.state.showSideDrawer ? classes.Blur : ' ',
					].join(' ')}
				>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}
export default Layout;
