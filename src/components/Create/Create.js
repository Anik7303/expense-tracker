import React, { useState } from "react";

// Stylesheet
import "./Create.scss";

// Components
import ErrorModal from "../Utility/ErrorModal/ErrorModal";

function Create(props) {
    const [entryType, setEntryType] = useState("entry");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        const target = event.target;
        console.log({ target, entryType, title, amount, error });
    };
    const closeModal = () => {
        setError(null);
    };
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "entryType":
                setEntryType(value);
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
            <form className="form" onSubmit={submitHandler} autoComplete="off">
                <div className="form__group">
                    <select
                        className="form__input"
                        name="entryType"
                        id="entryType"
                        value={entryType}
                        onChange={inputChangeHandler}
                    >
                        <option value="entry">Entry</option>
                        <option value="collection">Collection</option>
                    </select>
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
                    {/* <label className="form__label" htmlFor="title">
                        Title
                    </label> */}
                </div>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        value={amount}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form__group">
                    <button className="btn form__btn">Add</button>
                </div>
            </form>
        </section>
    );
}

export default Create;
