import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    
    const { userPermissions, openLoginModal } = props;
    
    let defaultView = '';
    
    if (userPermissions.admin || userPermissions.seller) {
        defaultView = (
            <Redirect to="/status"/>
        );
    } else if (userPermissions.basic) {
        defaultView = (
            <Redirect to="/auctions"/>
        );
    } else {
        defaultView = (
            <div>
                Welcome to the Well Worth New England site.  
                Please <span className="fake-link" onClick={openLoginModal}>Login</span> to register as a customer.
            </div>
        );
    }
    
    return(
        <div className='page'>
            <h1>home</h1>
           {defaultView}
        </div>
    );
    
}

export default Home;