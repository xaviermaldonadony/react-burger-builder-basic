import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../componets/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import * as actions from '../../store/actions/index';

class Checkout extends Component {
	componentWillUnmount() {
		console.log('unmounted');
		this.setState = (state, callback) => {
			return;
		};
	}
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		// console.log(this.props);
		let summary = <Redirect to='/' />;

		if (this.props.ings) {
			// when purchased burger it redirects to home
			const pruchasedRedirect = this.props.purchased ? (
				<Redirect to='/' />
			) : (
				'null'
			);
			summary = (
				<div>
					{pruchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);