import React from "react";

import "./Header.scss";

import Navigation from "../Navigation/Navigation";

function Header(props) {
    return (
        <header className="header">
            <Navigation />
        </header>
    );
}

export default Header;
