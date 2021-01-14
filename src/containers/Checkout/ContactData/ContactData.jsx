import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../componets/UI/Button/Button';
import Spinner from '../../../componets/UI/Spinner/Spinner';
import Input from '../../../componets/UI/Input/Input';
import axios from '../../../axios-orders';

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
					type: 'text',
					placeholder: 'email',
				},
				value: '',
				validation: {
					required: true,
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
				value: '',
				valid: true,
			},
		},
		formIsValid: false,
		loading: false,
	};

	oderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
		};

		axios
			.post('/orders.json', order)
			.then((response) => {
				// stop loading and close modal
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	};

	checkValidity(value, rules) {
		let isValid = true;

		// second approach for dropdown
		// if(!rules){
		// 	return true;
		// }

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length >= rules.maxLength && isValid;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		console.log(formIsValid);

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		console.log('in ContactData');
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
		if (this.state.loading) {
			form = <Spinner />;
		}
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
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

export default connect(mapStateToProps)(ContactData);
