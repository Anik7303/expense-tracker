import Firebase from "./firebase";
import FirebaseContext, { withFirebase } from "./context";
import AuthContext, { withAuthentication, withUser } from "./user";

export default Firebase;
export { FirebaseContext, AuthContext, withFirebase, withAuthentication, withUser };
