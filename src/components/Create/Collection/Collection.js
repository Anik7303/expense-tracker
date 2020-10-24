import React, { useState } from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet-async";

// Components
import { withError } from "../../Error/index";
import { withFirebase } from "../../../database/index";

function Collection(props) {
    console.log({ ...props });

    const [name, setName] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();

        const { firebase, history, setError } = props;
        firebase
            .addCollection(name)
            .then(() => {
                history.push("/collections");
            })
            .catch((error) => setError(error));
    };

    return (
        <section className="section-create">
            <Helmet>
                <title>New Collection | Expense Tracker</title>
            </Helmet>
            <form className="form" autoComplete="off" onSubmit={submitHandler}>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Collection Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label className="form__label" htmlFor="title">
                        Collection Name
                    </label>
                </div>
                <div className="form__group">
                    <button disabled={name === ""} className="btn btn__form">
                        Add
                    </button>
                </div>
            </form>
        </section>
    );
}

export default compose(withError, withFirebase)(Collection);
