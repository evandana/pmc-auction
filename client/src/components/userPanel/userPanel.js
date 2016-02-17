// Libraries
import React from 'react';
// Styles
import './userPanel.scss';
// Application Components
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
// React Components
import ListingTableBody from 'components/listingTableBody/listingTableBody';
import ListingTableHead from 'components/listingTableHead/listingTableHead';


let UserPanel = React.createClass({
    
    getInitialState () {
        return UserStore.getUser();
    },
    
    render () {
        return (
            <section className="user-panel-l">
                Logged in as: {this.state.google.cachedUserProfile.given_name} {this.state.google.cachedUserProfile.family_name}
            </section>
        );
    },
});

export default UserPanel;
