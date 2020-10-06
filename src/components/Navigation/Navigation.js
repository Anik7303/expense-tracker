import React from "react";

// Stylesheet
import "./Navigation.scss";

// Components
import NavigationItem from "./NavigationItem/NavigationItem.js";
import MakeIcon from "../Utility/MakeIcon/MakeIcon";

// Material-UI Icons
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

function Navigation() {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <NavigationItem text="New" url="/new" leftIcon={<MakeIcon icon={AddIcon} />} />
                <NavigationItem text="Home" url="/" />
                <NavigationItem text="" url="/profile" leftIcon={<MakeIcon icon={Avatar} />}>
                    <ul className="dropdown">
                        <li className="dropdown__item">Profile</li>
                        <li className="dropdown__item">Dashboard</li>
                        <li className="dropdown__item">Sign Out</li>
                    </ul>
                </NavigationItem>
            </ul>
        </nav>
    );
}

export default Navigation;
