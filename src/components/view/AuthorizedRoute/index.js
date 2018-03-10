import React, {Component} from 'react'
import { Route } from 'react-router-dom';

import NotAuthorized from 'components/view/NotAuthorized';

class AuthorizedRoute extends Component {

	constructor(props) {
		super(props);
    }
    
    render() {

        const { location, userPermissions, component: Component, ...rest } = this.props;

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
}

export default AuthorizedRoute;
