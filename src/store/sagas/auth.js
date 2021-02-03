import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token');
	yield call([localStorage, 'removeItem'], 'expirationDate');
	yield call([localStorage, 'removeItem'], 'userId');

	yield put({
		type: actionTypes.AUTH_LOGOUT,
	});
}

export function* checkAuthTimeoutSaga(action) {
	// first line equivalent to this
	// setTimeout(() => {
	// 	dispatch(logout());
	// }, expirationTime * 1000);
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart());
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};

	let url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuqkIFboJpZgO8yyX8Q2_qQo5nRLuFR34';

	if (!action.isSignup) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuqkIFboJpZgO8yyX8Q2_qQo5nRLuFR34';
	}

	try {
		const response = yield axios.post(url, authData);
		const expirationDate = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem('token', response.data.idToken);
		yield localStorage.setItem('expirationDate', expirationDate);
		yield localStorage.setItem('userId', response.data.localId);
		yield put(
			actions.authSuccess(response.data.idToken, response.data.localId)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn));
	} catch (error) {
		yield put(actions.authFail(error.response.data.error));
	}
}

export function* authCheckstateSaga(action) {
	const token = yield localStorage.getItem('token');

	if (!token) {
		yield put(actions.logout());
	} else {
		const expirationDate = yield new Date(
			localStorage.getItem('expirationDate')
		);
		if (expirationDate <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = yield localStorage.getItem('userId');
			const expTime = (expirationDate.getTime() - new Date().getTime()) / 1000;

			yield put(actions.authSuccess(token, userId));
			yield put(actions.checkAuthTimeout(expTime));
		}
	}
}
