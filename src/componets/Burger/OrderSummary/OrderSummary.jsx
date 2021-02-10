import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
	ingredients,
	price,
	purchaseCancelled,
	purchaseContinued,
}) => {
	// this could be a functional component,
	// doesn't have to be a class

	const ingredientSummary = Object.keys(ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}> {igKey}</span>:
				{ingredients[igKey]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients: </p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to Checkout?</p>
			<p>
				<strong>Total Price: {price ? price.toFixed(2) : ''}</strong>
			</p>
			<Button btnType='Danger' clicked={purchaseCancelled}>
				CANCEL
			</Button>
			<Button btnType='Success' clicked={purchaseContinued}>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default OrderSummary;
