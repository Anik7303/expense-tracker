import React, { Component } from "react";

import "./New.scss";

class New extends Component {
    state = {
        type: 0,
        title: "",
        amount: undefined,
        date: new Date(),
    };

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    submitHandler = () => {};

    render() {
        return (
            <div className="section-new">
                <form className="form" autoComplete="off">
                    <h2 className="heading-2 form__heading mb-lg">New Entry</h2>
                    <div className="form__group">
                        <select
                            className="form__item"
                            id="type"
                            name="type"
                            value={this.state.type}
                            onChange={this.inputHandler}
                        >
                            <option value="0">None</option>
                            <option value="1">Income (+)</option>
                            <option value="2">Expense (-)</option>
                        </select>
                        <label className="form__label" htmlFor="type">
                            Type
                        </label>
                    </div>
                    <div className="form__group">
                        <input
                            className="form__item"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.inputHandler}
                        />
                        <label className="form__label" htmlFor="title">
                            Title
                        </label>
                    </div>
                    <div className="form__group">
                        <input
                            className="form__item"
                            type="number"
                            id="amount"
                            name="amount"
                            step="1"
                            placeholder="Amount"
                            value={this.state.amount}
                            onChange={this.inputHandler}
                        />
                        <label className="form__label" htmlFor="amount">
                            Amount
                        </label>
                    </div>
                    <div className="form__group">
                        <button className="btn btn--form" onClick={this.submitHandler}>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default New;
