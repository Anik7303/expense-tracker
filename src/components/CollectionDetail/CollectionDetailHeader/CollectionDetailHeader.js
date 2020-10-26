import React from "react";

// StyleSheets
import "./CollectionDetailHeader.scss";

// Components
import MakeIcon from "../../Utility/MakeIcon/MakeIcon";

// Material UI Icons
import {
    AccessTime as AccessTimeIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from "@material-ui/icons";

// Helper Functions
import { addTrailingZeros, getLocaleDate, getTotal } from "../../Utility/utility";

function CollectionDetailHeader(props) {
    const { name, createdAt, updatedAt, income, expense } = props.collection;
    console.log({ name, createdAt, updatedAt, income, expense });
    return (
        <div className="collection__header">
            <span className="collection__created-at">
                <span className="collection__icon">{<MakeIcon icon={AccessTimeIcon} />}</span>
                {getLocaleDate(createdAt)}
            </span>
            <p className="collection__title">{name}</p>
            <span className="collection__updated-at">
                Last modified:
                <span className="collection__icon">{<MakeIcon icon={AccessTimeIcon} />}</span>
                {updatedAt && getLocaleDate(updatedAt)}
            </span>
            <div className="collection__total">
                <span className="collection__total-amount">
                    {addTrailingZeros(getTotal(income, expense))}
                </span>
                <span className="collection__total-text">Total</span>
            </div>
            <div className="collection__detail">
                <div className="collection__detail-plus">
                    <span className="collection__icon">{<MakeIcon icon={AddIcon} />}</span>
                    <span className="collection__detail-amount">{addTrailingZeros(income)}</span>
                </div>
                <div className="collection__detail-minus">
                    <span className="collection__icon">{<MakeIcon icon={RemoveIcon} />}</span>
                    <span className="collection__detail-amount">{addTrailingZeros(expense)}</span>
                </div>
            </div>
        </div>
    );
}

export default CollectionDetailHeader;
