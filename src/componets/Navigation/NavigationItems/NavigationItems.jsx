import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = ({ isAuthenticated }) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact>
			Burger Builder
		</NavigationItem>
		{isAuthenticated ? (
			<NavigationItem link='/orders'>Oders</NavigationItem>
		) : null}
		{!isAuthenticated ? (
			<NavigationItem link='/auth'>Athenticate</NavigationItem>
		) : (
			<NavigationItem link='/logout'>Logout</NavigationItem>
		)}
	</ul>
);

export default NavigationItems;
