import React, { useState } from "react";

// Stylesheet
import "./Signup.scss";

// Components
import ErrorModal from "../Utility/ErrorModal/ErrorModal";
import { withFirebase } from "../../database/index";

function Signup(props) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [invalid, setInvalid] = useState({});

    const closeModal = () => {
        setError(null);
    };
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

        const { firebase } = props;
        let userId = null;
        firebase
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
                userId = result.user.uid;
                return firebase.setUserInfo(userId, username, email);
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
            <ErrorModal data={error} closeFn={closeModal} />
            <form className="form" autoComplete="off">
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
                    <button className="btn btn__form" onClick={submitHandler}>
                        Sign up
                    </button>
                </div>
            </form>
        </section>
    );
}

export default withFirebase(Signup);
