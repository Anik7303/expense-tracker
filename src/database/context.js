import React from "react";

const FirebaseContext = React.createContext(null);

const withFirebase = (Component) => (props) => {
    return (
        <FirebaseContext.Consumer>
            {(firebase) => <Component {...props} firebase={firebase} />}
        </FirebaseContext.Consumer>
    );
};

const AuthContext = React.createContext(null);

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        state = { user: null };

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged((user) =>
                user ? this.setState({ user }) : this.setState({ user: null })
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        signOutHandler = () => {
            this.firebase.signOut();
        };

        render() {
            console.log({ ...this.props });
            return (
                <AuthContext.Provider value={this.state.user}>
                    <Component {...this.props} isAuth={this.state.user !== null} />
                </AuthContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default FirebaseContext;
export { withFirebase, withAuthentication, AuthContext };
