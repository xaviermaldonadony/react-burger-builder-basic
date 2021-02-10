import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../componets/Burger/Burger';
import BuildControls from '../../componets/Burger/BuildControls/BuildControls';
import Modal from '../../componets/UI/Modal/Modal';
import OrderSummary from '../../componets/Burger/OrderSummary/OrderSummary';
import Spinner from '../../componets/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

const BurgerBuilder = ({ history }) => {
	const [purchasing, setPurchashing] = useState(false);

	const dispatch = useDispatch();

	const { ingredients, totalPrice: price, error } = useSelector(
		(state) => state.burgerBuilder
	);
	const isAuthenticated = useSelector((state) => state.auth.token !== null);

	const onIngredientAdded = (ingName) =>
		dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved = (ingName) =>
		dispatch(actions.removeIngredient(ingName));
	// avoids recteating the function again
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetRedirectPath = (path) =>
		dispatch(actions.setAuthRedirectPath(path));

	useEffect(() => {
		onInitIngredients();
	}, [onInitIngredients]);

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return (sum += el);
			}, 0);

		// returns true or false
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (isAuthenticated) {
			setPurchashing(true);
		} else {
			onSetRedirectPath('/checkout');
			history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchashing(false);
	};

	const purchaseContinueHandler = () => {
		onInitPurchase();
		history.push('/checkout');
	};

	const disabledInfo = {
		...ingredients,
	};

	for (let key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let orderSummary = null;

	let burger = error ? <p> Ingredients can't be loaded!</p> : <Spinner />;

	if (ingredients) {
		// console.log('in burgerbuilder');
		// console.log(ings);
		burger = (
			<Aux>
				<Burger ingredients={ingredients} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState(ingredients)}
					isAuth={isAuthenticated}
					price={price}
					ordered={purchaseHandler}
				/>
			</Aux>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ingredients}
				price={price}
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}

	return (
		<Aux>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{/* show the spinner or orderSummary component */}
				{orderSummary}
			</Modal>
			{burger}
		</Aux>
	);
};

export default withErrorHandler(BurgerBuilder, axios);
