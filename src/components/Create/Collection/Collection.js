import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

// Components
import ErrorModal from "../../Utility/ErrorModal/ErrorModal";
import { withFirebase } from "../../../database/index";

function Collection(props) {
    console.log({ ...props });
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [invalid, setInvalid] = useState(true);

    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setName(value);
        setInvalid(value === "");
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const { firebase, history } = props;
        firebase
            .addCollection(name)
            .then((result) => {
                console.log({ result });
                history.push("/collections");
            })
            .catch((error) => setError(error));
    };

    return (
        <section className="section-create">
            <ErrorModal data={error} closeFn={() => setError(null)} />
            <form className="form" autoComplete="off" onSubmit={submitHandler}>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Collection Name"
                        value={name}
                        onChange={inputChangeHandler}
                    />
                    <label className="form__label" htmlFor="title">
                        Collection Name
                    </label>
                </div>
                <div className="form__group">
                    <button disabled={invalid} className="btn btn__form">
                        Add
                    </button>
                </div>
            </form>
        </section>
    );
}

export default compose(withRouter, withFirebase)(Collection);
