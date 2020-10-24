import React from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet-async";

// Stylesheet
import "./CollectionDetail.scss";

// Components
import { withFirebase } from "../../database/index";
import { withError } from "../Error/index";

// Material UI Icons
import {} from "@material-ui/icons";

function CollectionDetail(props) {
    const { firebase, setError } = props;
    return (
        <div className="section-collection-detail">
            <Helmet>
                <title>Details</title>
            </Helmet>
            CollectionDetail
        </div>
    );
}

export default compose(withError, withFirebase)(CollectionDetail);
