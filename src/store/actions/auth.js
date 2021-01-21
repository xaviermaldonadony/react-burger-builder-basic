import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => (dispatch) => {
	dispatch(authStart());
	const authData = {
		email,
		password,
		returnSecureToken: true,
	};

	let url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuqkIFboJpZgO8yyX8Q2_qQo5nRLuFR34';

	if (!isSignup) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuqkIFboJpZgO8yyX8Q2_qQo5nRLuFR34';
	}

	axios
		.post(url, authData)
		.then((response) => {
			const expirationDate = new Date(
				new Date().getTime() + response.data.expiresIn * 1000
			);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expirationDate);
			localStorage.setItem('userId', response.data.localId);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch((err) => {
			// console.log('error ------', err.response.data.error);
			dispatch(authFail(err.response.data.error));
		});
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path,
	};
};

export const authCheckstate = () => (dispatch) => {
	const token = localStorage.getItem('token');

	if (!token) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (expirationDate <= new Date()) {
			dispatch(logout());
		} else {
			const userId = localStorage.getItem('userId');
			const expTime = (expirationDate.getTime() - new Date().getTime()) / 1000;

			dispatch(authSuccess(token, userId));
			dispatch(checkAuthTimeout(expTime));
		}
	}
};
