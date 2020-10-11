import React, { useState, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Create from "../Create/Create";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from '../Home/Home';
import { withFirebase } from '../../database/index';
import ErrorModal from '../Utility/ErrorModal/ErrorModal';

function App(props) {
    console.log({...props});
    const [error, setError] = useState(null);
    const { firebase } = props;
    console.log(firebase.isAuthenticated());

    const signOutHandler = () => {
        firebase.signOut().then(() => {
            props.history.push('/');
        }).catch(error => setError(error));
    }

    const unprotectedRoutes = (
        <Fragment>
            <Route exact path={'/'} component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
        </Fragment>
    );
    const protectedRoutes = (
        <Fragment>
            <Route exact path={"/new"} component={Create} />
            <Route exact path={'/'} component={Home} />
            <Route exact path={"/signout"} render={() => signOutHandler()} />
        </Fragment>
    );

    return (
            <div className="container">
                {error && <ErrorModal data={error} closeModal={() => setError(null)} />}
                <Header />
                <main>
                    <Switch>
                        { firebase.isAuthenticated() ? protectedRoutes : unprotectedRoutes }
                    </Switch>
                </main>
                <Footer />
            </div>
    );
}

export default withRouter(withFirebase(App));
