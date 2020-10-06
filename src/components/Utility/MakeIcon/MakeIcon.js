import React from "react";

function Icon(props) {
    const { icon: Component, image } = props;
    const cssStyles = {
        fontSize: "inherit",
        color: "currentColor",
    };

    let attributes = { style: cssStyles };
    if (image) {
        attributes = { ...attributes, src: image };
    }

    return <Component {...attributes} />;
}

export default Icon;
