import React from 'react';
import Logo from '../../Logo/Logo';

const sideDrawer = (props) => {
    // ..
    return (
        <header>
        <div className="logo">
           <Logo />
        </div>
            <button type="button" id="sidebarCollapse" onClick = {props.sidebarOpenHandler} className="btn hamburger">
                 <div></div>
                 <div></div>
                 <div></div> 
            </button>
        </header>
    );
}

export default sideDrawer;