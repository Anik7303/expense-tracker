import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Stylesheet
import "./index.css";

// Components
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./database/index";

const element = (
    <React.StrictMode>
        <FirebaseContext.Provider value={new Firebase()}>
            <Router basename="/">
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </Router>
        </FirebaseContext.Provider>
    </React.StrictMode>
);

ReactDOM.render(element, document.getElementById("root"));

serviceWorker.unregister();
