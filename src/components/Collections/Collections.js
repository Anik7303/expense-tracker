import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { Helmet } from "react-helmet-async";

// Stylesheet
import "./Collections.scss";

// Components
import CollectionItem from "./CollectionItem/CollectionItem";
import { withFirebase } from "../../database/index";
import { toList } from "../Utility/utility";
import Spinner from "../Utility/Spinner/Spinner";
import { withError } from "../Error/index";

// const INITIAL_STATE = {
//     data: null,
//     loading: false,
// };

function Collections(props) {
    console.log({ ...props });

    const { firebase, setError } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [state, setState] = useState({});

    useEffect(() => {
        setLoading(true);
        // setState({ ...state, loading: true });
        firebase
            .collectionList()
            .once("value")
            .then((snapshot) => {
                const list = toList(snapshot.val());
                setData(list);
                setLoading(false);
                // setState({ ...state, data: list, loading: false });
            })
            .catch((error) => setError(error));
    }, [firebase, setError]);

    const collectionsEl =
        data &&
        data.map((item) => {
            return <CollectionItem key={item.key} collection={{ ...item.value, _id: item.key }} />;
        });

    return (
        <section className="section-collections">
            <Helmet>
                <title>Collections | Expense Tracker</title>
            </Helmet>
            {loading ? <Spinner /> : <div className="collections-container">{collectionsEl}</div>}
        </section>
    );
}

export default compose(withError, withFirebase)(Collections);
