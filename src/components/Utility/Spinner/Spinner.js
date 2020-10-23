import React from "react";

import "./Spinner.scss";

function Spinner(props) {
    const { message } = props;
    return (
        <div className="spinner-container">
            <div className="spinner">
                <span className="spinner__text">{message}</span>
            </div>
        </div>
    );
}

Spinner.defaultProps = {
    message: "Loading...",
};

export default Spinner;
