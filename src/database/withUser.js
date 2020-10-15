import React from 'react';

// Components
import { AuthContext } from '../database/index';

const withUser = (Component) => props => {
    return (
        <AuthContext.Consumer>
            { user => <Component {...props} user={user} isAuth={user !== null} />}
        </AuthContext.Consumer>
    );
}

export default withUser;