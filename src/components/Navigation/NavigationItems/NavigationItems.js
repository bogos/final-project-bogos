import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="list-unstyled components">
        <NavigationItem link="/" exact>Dashboard</NavigationItem>
        <NavigationItem link="/addGame">Add New Game</NavigationItem>
        <NavigationItem link="/reportGame">Game Report</NavigationItem>
        <NavigationItem link="/commisionReport">Commission Report</NavigationItem>
    </ul>
)

export default navigationItems;