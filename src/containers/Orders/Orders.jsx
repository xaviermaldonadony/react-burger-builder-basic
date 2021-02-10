import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../componets/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../componets/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

const Orders = ({ loading, token, onFetchOrders, userId, orders }) => {
	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let showOrders = <Spinner />;
	if (!loading) {
		showOrders = orders.map((order) => (
			<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}
			/>
		));
	}
	return <div>{showOrders}</div>;
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
