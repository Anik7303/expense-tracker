import React from "react";
import { Link } from "react-router-dom";

// Stylesheet
import "./CollectionItem.scss";

// Components
import MakeIcon from "../../Utility/MakeIcon/MakeIcon";

// Material UI icons
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    AccessTime as AccessTimeIcon,
    Delete as DeleteIcon,
} from "@material-ui/icons";

// Helper Functions
import { toCapitalize, addTrailingZeros, getLocaleDate, getTotal } from "../../Utility/utility";

function CollectionItem(props) {
    console.log({ ...props });
    const { _id, name, income, expense, createdAt, updatedAt } = props.collection;
    return (
        <Link className="collection-item" to={`/collection/${_id}`}>
            <div className="collection-item__description">
                <p className="collection-item__created">
                    <span className="collection-item__icon">
                        {<MakeIcon icon={AccessTimeIcon} />}
                    </span>
                    {getLocaleDate(createdAt)}
                </p>
                <p className="collection-item__name">{toCapitalize(name)}</p>
                {updatedAt && (
                    <p className="collection-item__updated">
                        Last modified: {getLocaleDate(updatedAt)}
                    </p>
                )}
            </div>
            <div className="collection-item__total">
                <span className="collection-item__total-amount">
                    BDT {addTrailingZeros(getTotal(income, expense))}
                </span>
                <span className="collection-item__total-text">Total</span>
            </div>
            <div className="collection-item__detail">
                <p className="collection-item__detail-plus">
                    <span className="collection-item__icon">{<MakeIcon icon={AddIcon} />}</span>
                    <span className="collection-item__detail-amount">
                        BDT {addTrailingZeros(income)}
                    </span>
                </p>
                <p className="collection-item__detail-minus">
                    <span className="collection-item__icon">{<MakeIcon icon={RemoveIcon} />}</span>
                    <span className="collection-item__detail-amount">
                        BDT {addTrailingZeros(expense)}
                    </span>
                </p>
            </div>
        </Link>
    );
}

export default CollectionItem;
