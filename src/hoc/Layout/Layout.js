import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
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
		const { isAuthenticated } = this.props;
		return (
			<Auxiliary>
				<Toolbar
					isAuth={isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={isAuthenticated}
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
			</Auxiliary>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(Layout);
