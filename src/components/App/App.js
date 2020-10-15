import React, { Fragment, useState } from "react";
import { Switch, Route, withRouter, Redirect, Link } from "react-router-dom";
import { compose } from 'recompose';

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Entry, Collection } from "../Create/Create";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Home from '../Home/Home';
import Collections from '../Collections/Collections';
import { withAuthentication, withFirebase } from '../../database/index';
import ErrorModal from '../Utility/ErrorModal/ErrorModal';

function App(props) {
    console.log({...props});
    const [error, setError] = useState(null);
    // const { firebase } = props;
    const { firebase, isAuth } = props;

    const signOutHandler = () => {
        firebase.signOut().then(() => {
            props.history.push('/');
        }).catch(error => setError(error));
    }

    // const isAuth = true;

    const reqAuth = (
        <Fragment>
            <Route exact path="/" component={AllRoutes} />
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route exact path={"/new/entry"} component={Entry} /> */}
            <Route exact path={"/new/collection"} component={Collection} />
            <Route exact path={"/collections"} component={Collections} />
            <Route exact path={"/signout"} render={() => signOutHandler()} />
            <Redirect to="/" />
        </Fragment>
    );

    const noReqAuth = (
        <Fragment>
            <Route exact path="/" component={AllRoutes} />
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
            <Redirect to="/" />
        </Fragment>
    );

    return (
            <div className="container">
                {error && <ErrorModal data={error} closeModal={() => setError(null)} />}
                <Header />
                <main>
                    <Switch>
                        {isAuth ? reqAuth : noReqAuth}
                    </Switch>
                </main>
                <Footer />
            </div>
    );
}

function AllRoutes(props) {
    return (
        <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/new/entry">Entry</Link></li>
                <li><Link to="/new/collection">Collection</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signout">Sign Out</Link></li>
            </ul>
        </section>
    );
}

// export default compose(withFirebase, withRouter)(App);
export default compose(withAuthentication, withRouter)(App);
