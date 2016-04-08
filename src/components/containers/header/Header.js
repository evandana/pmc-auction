import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import {AppBar, Tabs, Tab} from 'material-ui'

import './_header.scss'

class Header extends Component {

    static defaultProps = {
        tabs: [
                {
                    label: "Home",
                    route: "/"
                },
                {
                    label: "Auctions",
                    route: "/auctions"
                },
                {
                    label: "Confirm Winners",
                    route: "/auctions/confirmWinners"
                },
                {
                    label: "Add Auction",
                    route: "/auctions/add"
                },
                {
                    label: "Login",
                    route: "/login"
                },
            ]
    }

    constructor(props) {
        super(props)
    }

    handleTabChange (tab) {
        //${tab.props.route}
        console.log(this);
        console.log(hashHistory);
        hashHistory.push(tab.props.route); 
    }  

    render () {
        // styles to override material-ui 
        var styles = {
            header_title: {
                fontSize: "150%"
            },
            tab:{
                label:{
                    fontSize: "100%"
                }
            }
        };
        var handleTabChange = this.handleTabChange;
        var currentPath = window.location.hash.match(new RegExp("\#(.*)\\?"))[1];
        console.log(currentPath);

        return (
            <AppBar 
                className="header" 
                title={"Welcome, " + this.props.user.google.displayName}
                titleStyle={styles.header_title}
            >
                <Tabs className="header__tabs" value={currentPath}>
                    { this.props.tabs.map( function(tab) {
                        return <Tab 
                                    onActive={handleTabChange} 
                                    style={styles.tab.label} 
                                    route={tab.route} 
                                    label={tab.label}
                                    value={tab.route}
                                />
                    })}
                </Tabs>
            </AppBar>
        )
    }

    componentDidMount () {
        const { dispatch } = this.props
    }
}

function mapStateToProps (state) {
    return {
        user: state.login.user
      }
}

export default connect(mapStateToProps)(Header);



// <button onClick={() => hashHistory.push('/auctions')}>Go to /foo</button>