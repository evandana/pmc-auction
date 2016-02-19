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
                <div className="pure-g">
                    <div className="pure-u-1-2">
                        Logged in as: {this.state.name}
                    </div>
                    <div className="pure-u-1-2 user-panel-logoutCol">
                        <span onClick={this.logout}>LOGOUT</span>
                    </div>
                </div>
            </section>
        );
    },
    
    logout () {
        UserActions.logoutUser();
    }
});

export default UserPanel;
