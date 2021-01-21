import React from 'react';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const Burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			//return  an array, spread a new array with the amount of the ingredient, its length
			// Array(a number), then map it and fill it with a component and their props
			// console.log(props.ingredients[igKey]);
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []); //flatens array

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	);
};

export default withRouter(Burger);
