import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { compose } from "recompose";
import { Helmet } from "react-helmet-async";

// Stylesheet
import "./CollectionDetail.scss";

// Components
import { withFirebase } from "../../database/index";
import { withError } from "../Error/index";
import Spinner from "../Utility/Spinner/Spinner";
import CollectionDetailHeader from "./CollectionDetailHeader/CollectionDetailHeader";

// Helper Functions
import { toList } from "../Utility/utility";

function CollectionDetail(props) {
    const { firebase, setError } = props;
    const { id } = useParams();
    console.log({ id });

    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState(null);
    const [data, setData] = useState(null);

    console.log({ data, collection });

    useEffect(() => {
        setLoading(true);
        firebase
            .collection(id)
            .once("value")
            .then((result) => {
                const temp = { ...result.val() };
                console.log({ temp });
                if (temp) {
                    const list = toList(temp);
                    console.log({ list });
                    setData(list);
                }
            })
            .catch((error) => setError(error));

        firebase
            .collectionInfo(id)
            .once("value")
            .then((result) => {
                const temp = result.val();
                if (temp) {
                    setCollection(result.val());
                }
                setLoading(false);
            })
            .catch((error) => setError(error));
    }, [firebase]);

    const headEl = collection && <CollectionDetailHeader collection={collection} />;
    const renderEl = <Fragment>{headEl}</Fragment>;

    return (
        <div className="section-collection">
            <Helmet>
                <title>{`${collection?.name} - Details`}</title>
            </Helmet>
            {loading ? <Spinner /> : renderEl}
        </div>
    );
}

export default compose(withError, withFirebase)(CollectionDetail);
