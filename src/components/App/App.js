import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Stylesheet
import "./App.scss";

// Components
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Create from "../Create/Create";

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <main>
                    <Switch>
                        <Route exact path={"/new"} component={Create} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
