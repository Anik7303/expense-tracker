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
} from "@material-ui/icons";

// Helper Functions
import { toCapitalize, addTrailingZeros } from "../../Utility/utility";

function getLocaleDate(millisecond) {
    const temp = new Date(millisecond);
    return millisecond ? `${temp.toLocaleDateString()} ${temp.toLocaleTimeString()}` : null;
}

function getTotal(income, expense) {
    const x = Number.parseInt(income);
    const y = Number.parseInt(expense);
    return x - y;
}

function CollectionItem(props) {
    console.log({ ...props });
    const { _id, name, income, expense, createdAt, updatedAt } = props.collection;
    return (
        <Link className="collection" to={`/collection/${_id}`}>
            <div className="collection__description">
                <p className="collection__created">
                    <span className="collection__icon">{<MakeIcon icon={AccessTimeIcon} />}</span>
                    {getLocaleDate(createdAt)}
                </p>
                <p className="collection__name">{toCapitalize(name)}</p>
                {updatedAt && (
                    <p className="collection__updated">Last modified: {getLocaleDate(updatedAt)}</p>
                )}
            </div>
            <div className="collection__total">
                <span className="collection__total-amount">
                    BDT {addTrailingZeros(getTotal(income, expense))}
                </span>
                <span className="collection__total-text">Total</span>
            </div>
            <div className="collection__detail">
                <p className="collection__detail-plus">
                    <span className="collection__icon">{<MakeIcon icon={AddIcon} />}</span>
                    <span className="collection__detail-amount">
                        BDT {addTrailingZeros(income)}
                    </span>
                </p>
                <p className="collection__detail-minus">
                    <span className="collection__icon">{<MakeIcon icon={RemoveIcon} />}</span>
                    <span className="collection__detail-amount">
                        BDT {addTrailingZeros(expense)}
                    </span>
                </p>
            </div>
        </Link>
    );
}

export default CollectionItem;
