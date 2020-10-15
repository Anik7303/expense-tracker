import React, { Fragment } from "react";

// Stylesheet
import "./Navigation.scss";

// Components
import NavigationItem from "./NavigationItem/NavigationItem.js";
import MakeIcon from "../Utility/MakeIcon/MakeIcon";
import DropdownMenu from './Dropdown/Dropdown';
import { withFirebase } from '../../database/index';

// Material-UI Icons
import { Add as AddIcon } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

function Navigation({firebase}) {
    const unprotectedRoutes = (
        <Fragment>
            <NavigationItem text="Home" url="/" />
            <NavigationItem text="Login" url="/login" />
            <NavigationItem text="Sign Up" url="/signup" />
        </Fragment>
    );
    const protectedRoutes = (
        <Fragment>
            <DropdownMenu text="New" icon={<MakeIcon icon={AddIcon} />}>
                <NavigationItem text="Entry" url="/entry/new" />
                <NavigationItem text="Collection" url="/collection/new" />
            </DropdownMenu>
            <NavigationItem text="Home" url="/" />
            <DropdownMenu text={null} icon={<MakeIcon icon={Avatar} />}>
                <NavigationItem text="Profile" url="/profile" icon={<MakeIcon icon={AddIcon} />} />
                <NavigationItem text="Dashboard" url="/dashboard" icon={<MakeIcon icon={AddIcon} />} />
                <NavigationItem text="Sign Out" url="/signout" icon={<MakeIcon icon={AddIcon} />} />
            </DropdownMenu>
        </Fragment>
    );
    return (
        <nav className="nav">
            <ul className="nav__list">
                { firebase.isAuthenticated() ? protectedRoutes : unprotectedRoutes }
            </ul>
        </nav>
    );
}

export default withFirebase(Navigation);
