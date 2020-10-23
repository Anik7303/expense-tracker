import React, { useState, useEffect } from "react";
import { compose } from "recompose";

// Stylesheet
import "./Signup.scss";

// Components
import { withFirebase } from "../../database/index";
import { withError } from "../Error/index";

function Signup(props) {
    const { firebase, setError } = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [invalid, setInvalid] = useState(true);

    useEffect(() => {
        setInvalid(
            username === "" ||
                email === "" ||
                password === "" ||
                (password !== "" && password.toString() !== confirmPassword.toString())
        );
    }, [username, email, password, confirmPassword]);

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                throw new Error("unknown element triggered this event");
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();

        firebase
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const { uid } = result.user;
                return firebase.setUserInfo(uid, username, email);
            })
            .then(() => {
                return firebase.updateProfile({ displayName: username });
            })
            .then(() => {
                return firebase.addCollection();
            })
            .then(() => {
                props.history.push("/");
            })
            .catch((error) => setError(error));
    };

    return (
        <section className="section-signup">
            <form className="form" autoComplete="off" onSubmit={submitHandler}>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={inputChangeHandler}
                    />
                    <label htmlFor="username" className="form__label">
                        Username
                    </label>
                </div>
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
                    <label htmlFor="username" className="form__label">
                        Email
                    </label>
                </div>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={inputChangeHandler}
                    />
                    <label htmlFor="username" className="form__label">
                        Password
                    </label>
                </div>
                <div className="form__group">
                    <input
                        className="form__input"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={inputChangeHandler}
                    />
                    <label htmlFor="username" className="form__label">
                        Confirm Password
                    </label>
                </div>
                <div className="form__group">
                    <button className="btn btn__form" disabled={invalid}>
                        Sign up
                    </button>
                </div>
            </form>
        </section>
    );
}

export default compose(withError, withFirebase)(Signup);
