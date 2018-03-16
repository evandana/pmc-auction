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
            width: '100%',
            marginTop: '136px',
        }

        return (
            <Route {...rest} render={props => (
                userPermissions.basic || userPermissions.admin ? (
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
