import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

// Stylesheet
import "./Navigation.scss";

// Components
import NavigationItem from "./NavigationItem/NavigationItem.js";
import MakeIcon from "../Utility/MakeIcon/MakeIcon";
import DropdownMenu from "./Dropdown/Dropdown";
import { withUser } from "../../database/index";

// Material-UI Icons
import {
    Add as AddIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    FormatListBulleted as ListIcon,
    Note as NoteIcon,
    Collections as CollectionsIcon,
    PersonAdd as PersonAddIcon,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

function Navigation(props) {
    const { isAuth } = props;
    const location = useLocation();

    const unprotectedRoutes = (
        <Fragment>
            <NavigationItem text="Home" url="/" icon={<MakeIcon icon={HomeIcon} />} />
            <NavigationItem text="Login" url="/login" icon={<MakeIcon icon={PersonIcon} />} />
            <NavigationItem text="Sign Up" url="/signup" icon={<MakeIcon icon={PersonAddIcon} />} />
        </Fragment>
    );
    const protectedRoutes = (
        <Fragment>
            <DropdownMenu
                text="New"
                active={location.pathname.includes("/new", 0)}
                icon={<MakeIcon icon={AddIcon} />}
            >
                <NavigationItem text="Entry" url="/new/entry" icon={<MakeIcon icon={NoteIcon} />} />
                <NavigationItem
                    text="Collection"
                    url="/new/collection"
                    icon={<MakeIcon icon={ListIcon} />}
                />
            </DropdownMenu>
            <NavigationItem text="Home" url="/" icon={<MakeIcon icon={HomeIcon} />} />
            <NavigationItem
                text="Collections"
                url="/collections"
                icon={<MakeIcon icon={CollectionsIcon} />}
            />
            <DropdownMenu text={null} icon={<MakeIcon icon={Avatar} />}>
                <NavigationItem
                    text="Profile"
                    url="/profile"
                    icon={<MakeIcon icon={PersonIcon} />}
                />
                <NavigationItem
                    text="Dashboard"
                    url="/dashboard"
                    icon={<MakeIcon icon={DashboardIcon} />}
                />
                <NavigationItem
                    text="Sign Out"
                    url="/signout"
                    icon={<MakeIcon icon={ExitToAppIcon} />}
                />
            </DropdownMenu>
        </Fragment>
    );

    return (
        <nav className="nav">
            <ul className="nav__list">{isAuth ? protectedRoutes : unprotectedRoutes}</ul>
        </nav>
    );
}

export default withUser(Navigation);
