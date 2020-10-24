import React from "react";
import { Helmet } from "react-helmet-async";

// Stylesheet
import "./Home.scss";

function Home(props) {
    console.log({ ...props });
    return (
        <section className="section-home">
            <Helmet>
                <title>Home | Expense Tracker</title>
            </Helmet>
            <h1 className="heading-1">Home Section</h1>
        </section>
    );
}

export default Home;
