import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './componets/UI/Spinner/Spinner';

import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = ({ onTryAutoSignUp, isAuthenticated }) => {
	useEffect(() => {
		onTryAutoSignUp();
	}, [onTryAutoSignUp]);

	// guards in place
	const renderRoutes = () => {
		return isAuthenticated ? (
			<Switch>
				<Route path='/' exact component={BurgerBuilder} />
				<Suspense fallback={<Spinner />}>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/logout' component={Logout} />
					<Route path='/auth' component={Auth} />
				</Suspense>
				<Redirect to='/' />
			</Switch>
		) : (
			<Switch>
				<Route path='/' exact component={BurgerBuilder} />
				<Suspense fallback={<Spinner />}>
					<Route path='/auth' component={Auth} />
				</Suspense>
				<Redirect to='/' />
			</Switch>
		);
	};

	const routes = renderRoutes();
	return (
		<div>
			<Layout>{routes}</Layout>
		</div>
	);
};

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
