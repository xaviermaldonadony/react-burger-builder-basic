import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../componets/UI/Input/Input';
import Button from '../../componets/UI/Button/Button';
import Spinner from '../../componets/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared-utilities/utility';

import classes from './Auth.module.css';

const Auth = ({
	buildingBurger,
	authRedirectPath,
	onSetRedirectPath,
	onAuth,
	error,
	loading,
	isAuthenticated,
}) => {
	const [authForm, setAuthForm] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});

	const [isSignup, setIssignup] = useState(true);

	useEffect(() => {
		if (!buildingBurger && authRedirectPath !== '/') {
			onSetRedirectPath();
		}
	}, [buildingBurger, authRedirectPath, onSetRedirectPath]);

	const inputChangedHandler = (event, controlName) => {
		// update controls inner element, by creating a new object
		controlName = {
			[controlName]: updateObject(authForm[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					authForm[controlName].validation
				),
				touched: true,
			}),
		};

		// update authForm by creating a new object
		const updatedControls = updateObject(authForm, controlName);

		setAuthForm(updatedControls);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const { email, password } = authForm;
		onAuth(email.value, password.value, isSignup);
	};

	const switchAuthModeHandler = () => {
		setIssignup(!isSignup);
	};

	const formElementsArray = [];

	for (let key in authForm) {
		formElementsArray.push({
			id: key,
			config: authForm[key],
		});
	}

	let form = formElementsArray.map((formElement) => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)}
		/>
	));

	if (loading) {
		form = <Spinner />;
	}

	let errorMessage = null;

	if (error) {
		errorMessage = <p className=''>{error.message}</p>;
	}

	let authRedirect = null;
	if (isAuthenticated) {
		authRedirect = <Redirect to={authRedirectPath} />;
	}

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType='Success'> SUBMIT </Button>
			</form>
			<Button clicked={switchAuthModeHandler} btnType='Danger'>
				SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, pasword, isSignup) =>
			dispatch(actions.auth(email, pasword, isSignup)),
		onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
