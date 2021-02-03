<<<<<<< HEAD
import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
=======
// import { delay } from 'redux-saga';
import { put, delay } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
>>>>>>> 9615d8bc0f8460f414a566fb69e082baddd9a260

export function* logoutSaga(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
	yield localStorage.removeItem('userId');
<<<<<<< HEAD

	yield put({
		type: actionTypes.AUTH_LOGOUT,
	});
=======
	yield localStorage.removeItem('userId');

	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 100);
	yield put(actions.logout());
	// first line equivalent to this
	// setTimeout(() => {
	// 	dispatch(logout());
	// }, expirationTime * 1000);
>>>>>>> 9615d8bc0f8460f414a566fb69e082baddd9a260
}
