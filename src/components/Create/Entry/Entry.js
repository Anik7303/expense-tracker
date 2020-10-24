import React, { useEffect, useState } from "react";
import { compose } from "recompose";

// Components
import { withFirebase } from "../../../database/index";
import { withError } from "../../Error/index";
import { toList, toCapitalize } from "../../Utility/utility";
import Spinner from "../../Utility/Spinner/Spinner";

// Keys
import * as ENTRY_TYPE from "../../../database/keys";

// Helper functions
import { getCurrentDate as currentDate } from "../../Utility/utility";

function Entry(props) {
    console.log({ ...props });

    const { firebase, setError } = props;
    const [date, setDate] = useState("");
    const [collection, setCollection] = useState("");
    const [entryType, setEntryType] = useState(ENTRY_TYPE.INCOME);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    let invalid = title === "" || amount === "";

    useEffect(() => {
        setDate(currentDate());
    }, []);
    useEffect(() => {
        firebase
            .collectionList()
            .once("value")
            .then((snapshot) => {
                const list = toList(snapshot.val());
                const colValue = list.find((item) => item.value.name === "default");
                setData(list);
                setCollection(colValue.key);
                setIsLoading(false);
            })
            .catch((error) => setError(error));
    }, [firebase, setError]);

    const resetStates = () => {
        setDate(currentDate());
        setEntryType(ENTRY_TYPE.INCOME);
        setTitle("");
        setAmount("");
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const data = { type: entryType, title, amount, date };
        firebase
            .addEntry(data, collection)
            .then(() => resetStates())
            .catch((error) => setError(error));
    };
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "collection":
                setCollection(value);
                break;
            case "entryType":
                setEntryType(value);
                break;
            case "date":
                setDate(value);
                break;
            case "title":
                setTitle(value);
                break;
            case "amount":
                setAmount(value);
                break;
            default:
                throw new Error("unknown element triggered this event");
        }
    };

    const loaderElement = <Spinner />;
    const collectionElement =
        data &&
        data.map((item) => (
            <option key={item.key} value={item.key}>
                {toCapitalize(item.value.name)}
            </option>
        ));
    const formElement = (
        <form className="form" onSubmit={submitHandler} autoComplete="off">
            <div className="form__group">
                <input
                    className="form__input"
                    type="date"
                    value={date}
                    name="date"
                    id="date"
                    placeholder="Date"
                    onChange={inputChangeHandler}
                />
                <label className="form__label" htmlFor="date">
                    Date
                </label>
            </div>
            <div className="form__group">
                <select
                    className="form__input"
                    name="collection"
                    id="collection"
                    value={collection}
                    onChange={inputChangeHandler}
                >
                    {collectionElement}
                </select>
                <label className="form__label" htmlFor="collection">
                    Collection
                </label>
            </div>
            <div className="form__group">
                <select
                    className="form__input"
                    name="entryType"
                    id="entryType"
                    value={entryType}
                    onChange={inputChangeHandler}
                >
                    <option value={ENTRY_TYPE.INCOME}>{toCapitalize(ENTRY_TYPE.INCOME)}</option>
                    <option value={ENTRY_TYPE.EXPENSE}>{toCapitalize(ENTRY_TYPE.EXPENSE)}</option>
                </select>
                <label className="form__label" htmlFor="entryType">
                    Type
                </label>
            </div>
            <div className="form__group">
                <input
                    className="form__input"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={inputChangeHandler}
                />
                <label className="form__label" htmlFor="title">
                    Title
                </label>
            </div>
            <div className="form__group">
                <input
                    className="form__input"
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Amount"
                    step="1"
                    value={amount}
                    onChange={inputChangeHandler}
                />
                <label className="form__label" htmlFor="amount">
                    Amount
                </label>
            </div>
            <div className="form__group">
                <button disabled={invalid} className="btn btn__form">
                    Add
                </button>
            </div>
        </form>
    );

    return <section className="section-create">{isLoading ? loaderElement : formElement}</section>;
}

export default compose(withError, withFirebase)(Entry);
