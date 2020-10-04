import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.scss";

const Header = (props) => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink exact to="/dashboard" className="nav__link">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink exact to="/new" className="nav__link">
                            New
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink exact to="/collections" className="nav__link">
                            Collections
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink exact to="/about" className="nav__link">
                            About
                        </NavLink>
                    </li>
                    <li className="nav__item">
                        <NavLink exact to="/login" className="nav__link">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav__item">User Image</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
