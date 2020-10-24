import React, { useEffect, useState } from "react";

// Components
import { withFirebase } from "./context";

const AuthContext = React.createContext(null);

const withAuthentication = (Component) =>
    withFirebase((props) => {
        const [user, setUser] = useState(null);
        const { firebase } = props;

        useEffect(() => {
            const listener = firebase.auth.onAuthStateChanged((auth) =>
                auth ? setUser(auth) : setUser(null)
            );
            return () => listener();
        }, [firebase]);

        return (
            <AuthContext.Provider value={user}>
                <Component {...props} isAuth={user !== null} />
            </AuthContext.Provider>
        );
    });

const withUser = (Component) => (props) => {
    return (
        <AuthContext.Consumer>
            {(user) => <Component {...props} user={user} isAuth={user !== null} />}
        </AuthContext.Consumer>
    );
};

export default AuthContext;
export { withAuthentication, withUser };
