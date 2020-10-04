import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import Header from "../../components/Header/Header";
import MainSection from "../../components/MainSection/MainSection";
import Footer from "../../components/Footer/Footer";

class App extends Component {
    render() {
        return (
            <Router basename="/expense-tracker/">
                <div className="container">
                    <Header />
                    <MainSection />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
