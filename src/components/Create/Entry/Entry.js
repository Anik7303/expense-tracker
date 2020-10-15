import React, { useEffect, useState } from "react";

// Components
import ErrorModal from "../../Utility/ErrorModal/ErrorModal";
import { withFirebase } from "../../../database/index";
import { toList } from '../../Utility/utility';

// Helper functions
import { getCurrentDate as currentDate } from "../../Utility/utility";

const ENTRY_TYPE = {
    INCOME: "income",
    EXPENSE: "expense",
};

function Entry(props) {
    console.log({ ...props });

    const { firebase } = props;
    const [date, setDate] = useState("");
    const [collection, setCollection] = useState('');
    const [entryType, setEntryType] = useState(ENTRY_TYPE.INCOME);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let invalid = title === "" || amount === "";
    let collectionElement = null;
    // if(data) {
    //     collectionElement = toList(data).map(item => {
    //         // if(item.value === 'default') {
    //         //     setCollection(item.key);
    //         // }
    //         return (
    //             <option key={item.key} value={item.key} >{item.value}</option>
    //         )
    //     });
    //     setIsLoading(false);
    // }

    useEffect(() => {
        setDate(currentDate());
    }, []);

    useEffect(() => {
        firebase.collectionList()
            .once("value")
            .then((snapshot) => {
                setData(snapshot.val());
            })
            .catch(error => setError(error));
    }, [firebase]);

    const resetStates = () => {
        setDate(currentDate());
        setEntryType(ENTRY_TYPE.INCOME);
        setTitle("");
        setAmount("");
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const data = { type: entryType, title, amount, date };
        console.log({data, collection});
        firebase
            .addEntry(data, collection)
            .then(() => {
                resetStates();
            })
            .catch((error) => setError(error));
    };
    const closeModal = () => {
        setError(null);
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

    return (
        <section className="section-create">
            <ErrorModal data={error} closeFn={closeModal} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form className="form" onSubmit={submitHandler} autoComplete="off">
                    <div className="form__group">
                        <input
                            className="form__input"
                            type="date"
                            name="date"
                            id="date"
                            placeholder="Date"
                            value={date}
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
                            <option value={ENTRY_TYPE.INCOME}>{ENTRY_TYPE.INCOME}</option>
                            <option value={ENTRY_TYPE.EXPENSE}>{ENTRY_TYPE.EXPENSE}</option>
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
                            step="0.1"
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
            )}
        </section>
    );
}

export default withFirebase(Entry);
