import React, { Component, PropTypes } from 'react'
import { Router, RouteHandler, Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { AppBar, Tabs, Tab, LeftNav, MenuItem, IconButton } from 'material-ui'
import { NavigationClose, NavigationMenu }from 'material-ui/lib/svg-icons';

import './_header.scss'

class Header extends Component {

    static defaultProps = {
        tabs: [
                {
                    label: "Home",
                    id: "home",
                    route: "/"
                },
                {
                    label: "Auctions",
                    id: "auctions",
                    route: "/auctions"
                },
                {
                    label: "Confirm Winners",
                    id: "confirmWinners",
                    route: "/auctions/confirmWinners"
                }//,
                // {
                //     label: "Add Auction",
                //     id: "addAuction",
                //     route: "/auctions/add"
                // },
                // {
                //     label: "Login",
                //     id: "login",
                //     route: "/login"
                // },
            ],

        defaultTitle: "PMC Auction"
    }

    constructor(props) {
        super(props)
        console.log(this.props);
        this.state = {
            openNav : false,
            loggedIn : (this.props.user.google) ? true : false,
        };
    }

    // Handling Clicking on Tab Item on Tabs
    handleTabChange (tab) {
        //${tab.props.route}
        hashHistory.push(tab.props.route);
        this.setState({currentPage: tab.props.label});
    }

    // Handling Toggle Nav
    handleToggleNav = () => this.setState({openNav: !this.state.openNav});

    // Handling Click on Left Nav Menu Item
    handleNavItemTap (tab) {
        this.setState({openNav: false, currentPage: tab.label});
        hashHistory.push(tab.route);
    }

    // Returns set of tabs based on User Credentials
    getTabsBasedOnUser (){
        var tabs = this.props.tabs;
        tabs.map( function(tab, index){
            switch(tab.id){
                case "confirmWinners":
                    // add check for user permissions to confirm winner
                    tabs.splice(index,1);
                    break;
                case "login":
                    if( this.state.loggedIn ){
                        tabs.splice(index,1);
                    }
                    break;
            }
        }, this)

        return tabs;
    }

    render () {
        // styles to override material-ui
        var styles = {
            header_title: {
                fontSize: "130%"
            },
            header: {
                position: "fixed"
            },
            tab:{
                label:{
                    fontSize: "100%"
                }
            }
        };

        // Reference
        var currentPath = window.location.hash.match(new RegExp("\#(.*)\\?"))[1];
        var tabs = this.getTabsBasedOnUser();

        return (
            <header>
                <AppBar
                    className="header"
                    style={styles.header}
                    title={(this.state.loggedIn) ? "Welcome, " + this.props.user.google.displayName : this.props.defaultTitle}
                    titleStyle={styles.header_title}
                    onLeftIconButtonTouchTap={this.handleToggleNav}
                >
                    <Tabs className="header__tabs" value={currentPath}>
                        {
                            tabs.map( function(tab) {
                                return <Tab
                                            onActive={::this.handleTabChange}
                                            style={styles.tab.label}
                                            route={tab.route}
                                            label={tab.label}
                                            value={tab.route}
                                            key={tab.id}
                                        />
                            }, this)
                        }
                    </Tabs>
                </AppBar>
                <LeftNav
                  docked={false}
                  width={200}
                  className="header__leftNav"
                  open={this.state.openNav}
                  onRequestChange={openNav => this.setState({openNav})}
                >
                    {
                        tabs.map( function(tab) {
                            return <MenuItem
                                        onTouchTap={::this.handleNavItemTap.bind(this, tab)}
                                        route={tab.route}
                                        key={tab.id}
                                    >{tab.label}
                                    </MenuItem>
                        }, this)
                    }
                </LeftNav>
            </header>
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