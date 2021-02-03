import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
	logoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckstateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { fetchOrdersSagas, purchaseBurgerSaga } from './order';

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckstateSaga),
	]);
}

export function* watchBurgerBuilder() {
	yield all([takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)]);
}

export function* watchOrder() {
	yield all([
		takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
		takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSagas),
	]);
}
