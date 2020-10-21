import React from "react";

// Stylesheet
import "./Home.scss";

function Home(props) {
    console.log({ ...props });
    return (
        <section className="section-home">
            <h1 className="heading-1">Home Section</h1>
        </section>
    );
}

export default Home;
