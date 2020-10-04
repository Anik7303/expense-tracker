import React from "react";
import { Switch, Route } from "react-router-dom";

import "./MainSection.scss";
import New from "../../containers/New/New";

const MainSection = (props) => {
    return (
        <main className="section-main">
            <Switch>
                <Route exact path="/new" component={New} />
            </Switch>
        </main>
    );
};

export default MainSection;
