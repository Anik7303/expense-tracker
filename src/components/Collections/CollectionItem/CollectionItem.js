import React from "react";

// Stylesheet
import "./CollectionItem.scss";

function CollectionItem(props) {
    console.log({ ...props });
    return (
        <div className="collection-item">
            <span>Collection Item</span>
        </div>
    );
}

export default CollectionItem;
