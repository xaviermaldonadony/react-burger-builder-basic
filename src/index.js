import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
<<<<<<< HEAD
import { logoutSaga } from './store/sagas/auth';
=======
import { watchAuth } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();
>>>>>>> 9615d8bc0f8460f414a566fb69e082baddd9a260

// const logger = (store) => {
// 	return (next) => {
// 		return (action) => {
// 			console.log('[Middleware] Dispatching', action);
// 			const result = next(action);
// 			console.log('[Middleware] next state', store.getState());
// 			return result;
// 		};
// 	};
// };

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

<<<<<<< HEAD
sagaMiddleware.run(logoutSaga);
=======
sagaMiddleware.run(watchAuth);
>>>>>>> 9615d8bc0f8460f414a566fb69e082baddd9a260

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);

<<<<<<< HEAD
// 24 5
=======
// 25 7
>>>>>>> 9615d8bc0f8460f414a566fb69e082baddd9a260
//19
//5 7
