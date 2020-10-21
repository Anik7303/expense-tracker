import React, { useEffect, useState } from "react";

// Stylesheet
import "./Login.scss";

// Components
import ErrorModal from "../Utility/ErrorModal/ErrorModal";
import { withFirebase } from "../../database/index";

function Login(props) {
    console.log({ ...props });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [invalid, setInvalid] = useState(true);

    useEffect(() => {
        setInvalid(email === "" || password === "");
    }, [email, password]);

    const closeModal = () => {
        setError(null);
    };
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                throw new Error("unknown element triggered this event");
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const { firebase, history } = props;
        firebase
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push("/");
            })
            .catch((error) => setError(error));
    };

    return (
        <section className="section-login">
            <ErrorModal data={error} closeFn={closeModal} />
            <form className="form" autoComplete="off" onSubmit={submitHandler}>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={inputChangeHandler}
                    />
                    <label className="form__label" htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={inputChangeHandler}
                    />
                    <label className="form__label" htmlFor="form__label">
                        Password
                    </label>
                </div>
                <div className="form__group">
                    <button className="btn btn__form" disabled={invalid}>
                        Login
                    </button>
                </div>
            </form>
        </section>
    );
}

export default withFirebase(Login);
