import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Entry, Collection } from "../Create/Create";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from '../Home/Home';
import { withFirebase } from '../../database/index';
import ErrorModal from '../Utility/ErrorModal/ErrorModal';

function App(props) {
    console.log({...props});
    const [error, setError] = useState(null);
    const { firebase } = props;

    const signOutHandler = () => {
        firebase.signOut().then(() => {
            props.history.push('/');
        }).catch(error => setError(error));
    }

    return (
            <div className="container">
                {error && <ErrorModal data={error} closeModal={() => setError(null)} />}
                <Header />
                <main>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={"/entry/new"} component={Entry} />
                        <Route exact path={"/login"} component={Login} />
                        <Route exact path={"/signup"} component={Signup} />
                        <Route exact path={"/signout"} render={() => signOutHandler()} />
                    </Switch>
                </main>
                <Footer />
            </div>
    );
}

export default withRouter(withFirebase(App));
