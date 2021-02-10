import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal = ({ show, modalClosed, children }) => {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	// this component can have 2 diff children
	// 	return (
	// 		nextProps.show !== this.props.show ||
	// 		nextProps.children !== this.props.children
	// 	);
	// }

	return (
		<Aux>
			<Backdrop show={show} clicked={modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: show ? '1' : '0',
				}}
			>
				{children}
			</div>
		</Aux>
	);
};

export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
);
// only update if props changes
// if u want to check a certain set of props
// anomymous func, returns true if they are equal
