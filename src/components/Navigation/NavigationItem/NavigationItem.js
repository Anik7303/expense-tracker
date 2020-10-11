import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.scss";

function NavigationItem(props) {
    const { url, text, icon} = props;
    return (
        <li className="nav__item">
            <NavLink exact to={url} className="nav__link">
                {icon && <span className="nav__icon">{icon}</span>}
                {text}
            </NavLink>
        </li>
    );
}

export default NavigationItem;
