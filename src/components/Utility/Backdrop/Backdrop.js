import React from "react";

// Stylesheet
import "./Backdrop.scss";

function Backdrop(props) {
    const { show, close } = props;
    return show ? <div className="backdrop" onClick={close}></div> : null;
}

export default Backdrop;
