import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../componets/UI/Button/Button';
import Spinner from '../../../componets/UI/Spinner/Spinner';
import Input from '../../../componets/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import { updateObject, checkValidity } from '../../../shared-utilities/utility';

import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxlength: 5,
					isNumeric: true,
				},
				valid: false,
				touched: false,
			},
			state: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'State',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				validation: {},
				value: 'fastest',
				valid: true,
			},
		},
		formIsValid: false,
	};

	oderHandler = (event) => {
		event.preventDefault();
		const { ings, price, token, onOrderBurger, userId } = this.props;
		const { orderForm } = this.state;
		const formData = {};

		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: ings,
			price: price,
			orderData: formData,
			userId: userId,
		};

		onOrderBurger(order, token);
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const { orderForm } = this.state;

		// create an object with update form inputs
		const updatedFormElement = updateObject(orderForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(
				event.target.value,
				orderForm[inputIdentifier].validation
			),
			touched: true,
		});

		// new object with updatedForm
		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement,
		});

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	buildForm = () => {
		const formElmentsArray = [];

		for (let key in this.state.orderForm) {
			formElmentsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.oderHandler}>
				{formElmentsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}

				<Button
					btnType='Success'
					clicked={this.oderHandler}
					disabled={!this.state.formIsValid}
				>
					Order
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}
		return form;
	};

	buildForm() {}
	render() {
		const form = this.buildForm();

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
