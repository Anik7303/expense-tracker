import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

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
import CollectionDetail from "../CollectionDetail/CollectionDetail";
import { withAuthentication } from "../../database/index";
import { ErrorContext } from "../Error/index";
import ErrorModal from "../Utility/ErrorModal/ErrorModal";

function App(props) {
    console.log({ ...props });
    const [error, setError] = useState(null);
    const { firebase, isAuth } = props;
    const history = useHistory();

    const reqAuth = (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={"/new/entry"} component={Entry} />
            <Route exact path={"/new/collection"} component={Collection} />
            <Route exact path={"/collections"} component={Collections} />
            <Route path={"/collection/:collectionId"} component={CollectionDetail} />
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

    const signOutHandler = () => {
        firebase
            .signOut()
            .then(() => {
                history.push("/");
            })
            .catch((error) => setError(error));
    };

    return (
        <div className="container">
            {error && <ErrorModal data={error} closeFn={() => setError(null)} />}
            <ErrorContext.Provider value={setError}>
                <Header />
                <main className="section-main">{isAuth ? reqAuth : noReqAuth}</main>
                <Footer />
            </ErrorContext.Provider>
        </div>
    );
}

export default withAuthentication(App);
