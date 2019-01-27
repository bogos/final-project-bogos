import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const sidebar = (props) => (
    <nav id="sidebar" className={props.isSidebarOpen ? 'shaddow active': 'shaddow'}>
        <div className="sidebar-header">
            <Logo />
        </div>
        <NavigationItems />
    </nav>
);

export default sidebar;