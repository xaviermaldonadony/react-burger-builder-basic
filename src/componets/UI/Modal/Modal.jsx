import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {
	// Only here fo debugging, should be a functional component
	// doesn't have to be a class
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	componentDidUpdate() {
		console.log('[Modal] DidUpdate');
	}
	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
