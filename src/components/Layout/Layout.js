import React from 'react';
import Sidebar from '../Navigation/SideBar/SideBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    return (
        <React.Fragment>
            <Sidebar isSidebarOpen={props.isSideBarOpen}/>
            <div id="content">
                <SideDrawer sidebarOpenHandler={props.sidebarOpenHandler}/>
                <div className="content-wrapper">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    );
}
export default layout;