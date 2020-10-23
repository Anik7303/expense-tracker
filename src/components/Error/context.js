import React, { createContext } from "react";

const ErrorContext = createContext(null);

// const withError = (Component) => (props) => {
export function withError(Component) {
    return function (props) {
        return (
            <ErrorContext.Consumer>
                {(setError) => <Component {...props} setError={setError} />}
            </ErrorContext.Consumer>
        );
    };
}

export default ErrorContext;
