import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact>
			Burger Builder
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link='/orders'>Oders</NavigationItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavigationItem link='/auth'>Athenticate</NavigationItem>
		) : (
			<NavigationItem link='/logout'>Logout</NavigationItem>
		)}
	</ul>
);

export default NavigationItems;
