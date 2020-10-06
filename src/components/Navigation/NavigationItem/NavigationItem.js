import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.scss";

function NavigationItem(props) {
    const { url, text, leftIcon, rightIcon } = props;
    const [open, setOpen] = useState(false);

    const mouseEnterHandler = () => {
        setOpen(true);
    };

    const mouseLeaveHandler = () => {
        setOpen(false);
    };

    return (
        <li className="nav__item">
            <NavLink
                exact
                to={url}
                className="nav__link"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                {leftIcon && <span className="nav__icon">{leftIcon}</span>}
                {text}
                {rightIcon && <span className="nav__icon nav__icon--right">{rightIcon}</span>}

                {/* {open && props.children} */}
                {props.children}
            </NavLink>
        </li>
    );
}

export default NavigationItem;
