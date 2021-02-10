import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../componets/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ history, ings, purchased, match }) => {
	// componentWillUnmount() {
	// 	console.log('unmounted');
	// }

	const checkoutCancelledHandler = () => {
		history.goBack();
	};

	const checkoutContinuedHandler = () => {
		history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to='/' />;

	if (ings) {
		// when purchased burger it redirects to home
		const pruchasedRedirect = purchased ? <Redirect to='/' /> : null;
		summary = (
			<div>
				{pruchasedRedirect}
				<CheckoutSummary
					ingredients={ings}
					checkoutCancelled={checkoutCancelledHandler}
					checkoutContinued={checkoutContinuedHandler}
				/>
				<Route path={match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
	return summary;
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
