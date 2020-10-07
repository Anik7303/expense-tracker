import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Create from "../Create/Create";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <main>
                    <Switch>
                        <Route exact path={"/new"} component={Create} />
                        <Route exact path={"/login"} component={Login} />
                        <Route exact path={"/signup"} component={Signup} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
