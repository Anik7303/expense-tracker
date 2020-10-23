import React, { useState, useEffect, Fragment } from "react";
import { compose } from "recompose";

// Stylesheet
import "./Collections.scss";

// Components
import CollectionItem from "./CollectionItem/CollectionItem";
import { withFirebase } from "../../database/index";
import { withError } from "../Error/index";
import { toList } from "../Utility/utility";
import Spinner from "../Utility/Spinner/Spinner";

const INITIAL_STATE = {
    data: null,
    loading: false,
};

function Collections(props) {
    console.log({ ...props });
    const { firebase, setError } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [state, setState] = useState({});

    console.log({ data, loading });
    // console.log({ ...state });

    useEffect(() => {
        setLoading(true);
        // setState({ ...state, loading: true });
        firebase
            .collections()
            .once("value")
            .then((snapshot) => {
                const list = toList(snapshot.val());
                console.log({ list });
                setData(list);
                setLoading(false);
                // setState({ ...state, data: list, loading: false });
            })
            .catch((error) => setError(error));
    }, [firebase]);

    const loaderEl = <Spinner />;
    const collectionsEl =
        data &&
        data.map((item) => {
            return <CollectionItem key={item.key} info={item.value.info} />;
        });
    const returnEl = (
        <Fragment>
            <h1 className="heading-1" style={{ textAlign: "center" }}>
                Collections
            </h1>
            <div className="collections-container">{collectionsEl}</div>
        </Fragment>
    );

    return <section className="section-collections">{loading ? loaderEl : returnEl}</section>;
}

export default compose(withError, withFirebase)(Collections);
