import React from 'react';
import './styles.css';

const NotAuthorizedPage = props => {

    const { from } = props;

    const path = from.pathname;

    return (
        <div className="page">
            Not Authorized
            <div className="loader">
                <div className="loader-spinner" />
            </div>
        </div>
    );
};

export default NotAuthorizedPage;