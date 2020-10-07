import React from "react";
import ReactDOM from "react-dom";

// Stylesheet
import "./index.css";

// Components
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./database/index";

const element = (
    <React.StrictMode>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </React.StrictMode>
);

ReactDOM.render(element, document.getElementById("root"));

serviceWorker.unregister();
