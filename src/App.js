import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignUp();
	}

	shouldComponentUpdate() {
		let empty = true;
		for (let key in this.props.ings) {
			// console.log(this.props.ings[key]);
			if (this.props[key] > 0) empty = false;
		}
		console.log(this.props.purchased, empty);
		// console.log(empty);
		return !empty;
	}

	// guards in place
	renderRoutes = () => {
		const { isAuthenticated } = this.props;

		return isAuthenticated ? (
			<Switch>
				<Route path='/checkout' component={Checkout} />
				<Route path='/orders' component={Orders} />
				<Route path='/logout' component={Logout} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		) : (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		);
	};

	render() {
		const routes = this.renderRoutes();
		return (
			<div>
				<Layout>{routes}</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
		ings: state.burgerBuilder.ingredients,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckstate()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
