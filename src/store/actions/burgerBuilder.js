import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

// async call to fetch ingredients
export const initIngredients = () => {
	// this is available due to redux thunk
	return (dispatch) => {
		axios
			.get(
				'https://react-my-burger-794fd-default-rtdb.firebaseio.com/ingredients.json'
			)
			.then((response) => {
				dispatch(setIngredients(response.data));
			})
			.catch((error) => {
				dispatch(fetchIngredientsFailed());
			});
	};
};
