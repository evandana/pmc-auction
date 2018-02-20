import React from 'react'
import { Route } from 'react-router-dom';

import NotAuthorized from 'components/view/NotAuthorized';

const AuthorizedRoute = (props) => {

    const { location, userPermissions, component: Component, ...rest } = props;

    const notAuthProps = {
        from: location
    };
    
    const pageWrapperStyles = {
        position: 'fixed',
        width: '100%',
        height: 'calc(100% - 175px)',
        // height: userPermissions.admin ? 'calc(100% - 247px)' : 'calc(100% - 175px)',
    }

    return (
        <Route {...rest} render={props => (
            userPermissions.basic || userPermissions.admin || userPermissions.seller ? (
                    <div className='page-wrapper' style={pageWrapperStyles}>
                        <Component {...props}/>
                    </div>
                ) : (
                    <NotAuthorized {...notAuthProps} />
                )
        )}/>
    );
}

export default AuthorizedRoute;
