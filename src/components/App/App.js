import React, { useState } from "react";
import { Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { compose } from "recompose";

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Entry, Collection } from "../Create/Create";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import Collections from "../Collections/Collections";
import { withAuthentication } from "../../database/index";
import ErrorModal from "../Utility/ErrorModal/ErrorModal";

function App(props) {
    console.log({ ...props });
    const [error, setError] = useState(null);
    const { firebase, isAuth } = props;

    const signOutHandler = () => {
        firebase
            .signOut()
            .then(() => {
                props.history.push("/");
            })
            .catch((error) => setError(error));
    };

    const reqAuth = (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={"/new/entry"} component={Entry} />
            <Route exact path={"/new/collection"} component={Collection} />
            <Route exact path={"/collections"} component={Collections} />
            <Route exact path={"/signout"} render={() => signOutHandler()} />
            <Redirect to="/" />
        </Switch>
    );

    const noReqAuth = (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Redirect to="/" />
        </Switch>
    );

    return (
        <div className="container">
            {error && <ErrorModal data={error} closeModal={() => setError(null)} />}
            <Header />
            <main>{isAuth ? reqAuth : noReqAuth}</main>
            <Footer />
        </div>
    );
}

export default compose(withAuthentication, withRouter)(App);
