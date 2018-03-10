import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/styles/colors'

import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import RedeemIcon from 'material-ui/svg-icons/action/redeem';
// import TimelineIcon from 'material-ui/svg-icons/action/timeline';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
// import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
// import MoodIcon from 'material-ui/svg-icons/social/mood';
import PollIcon from 'material-ui/svg-icons/social/poll';
// import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
// import WhatsHotIcon from 'material-ui/svg-icons/social/whatshot';
// import StarIcon from 'material-ui/svg-icons/toggle/star';
// import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { getImageForEnv } from 'static/images/index'

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToRoute = this.navigateToRoute.bind(this);
        this.toggleAuctionDetail = this.props.toggleAuctionDetail.bind(this);
        this.themePalette = this.props.muiTheme.palette;
    }
    
    buildIconMenu (permissions, actions) {
        const { logout } = actions;
        if (permissions.basic) {
            return (
                <IconMenu
                    iconButtonElement={<IconButton><ExpandMoreIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <MenuItem onTouchTap={logout} primaryText="Logout" />
                </IconMenu>
            );
        }
    };

    navigateToRoute (someArg, evt, tabEl) {
        // close any open auction item
        // this.toggleAuctionDetail();
        // navigate
        this.props.history.push(tabEl.props['data-route']);
    };

    buildTab ({icon, label, active, link, style}) {
        return (
            <Tab
                label={label}
                data-route={'/'+link}
                icon={icon}
                key={link}
                style={style}
            />
            );
    };

    buildNavigationTabs (permissions, config) {

        const tabObjs = [
            {
                icon: <ChromeReaderModeIcon />,
                label: 'About',
                link: 'about',
            },
            {
                icon: <ModeEditIcon/>,
                label: 'Editor',
                link: 'create-auction',
                permissionsRequired: ['donor'],
                configRequired: ['CREATE_AUCTIONS'],
                style: {background: this.themePalette.accent1Color}
            },
            {
                icon: <LocalPlayIcon />,
                label: 'Auctions',
                link: 'auctions',
            },
            {
                icon: <PersonIcon />,
                label: 'Status',
                link: 'status',
            },
            {
                icon: <CreditCardIcon />,
                label: 'Donate',
                link: 'donate',
            },
            {
                icon: <RedeemIcon />,
                label: 'Thanks',
                link: 'sponsors',
            },
        ];

        const currentPagePath = window.location.pathname; // e.g. '/auctions'

        const tabs = tabObjs
            .filter(tabObj => {
                return !tabObj.permissionsRequired || tabObj.permissionsRequired.every(reqPermission => permissions[reqPermission] === true);
            })
            .filter(tabObj => {
                return !tabObj.configRequired || tabObj.configRequired.every(reqConfig => config[reqConfig] === true);
            })
            .map(tabObj => {
                return this.buildTab(tabObj);
            });

        const initialSelectedIndex = tabObjs.findIndex(tab => '/' + tab.link === currentPagePath) 

        return (
            <Tabs
                inkBarStyle={{background: this.themePalette.highlight1Color}}
                initialSelectedIndex={initialSelectedIndex === -1 ? 0 : initialSelectedIndex}
                onChange={this.navigateToRoute}
                tabItemContainerStyle={{backgroundColor: this.themePalette.primary2Color}}
                onClick={() => {
                    if (currentPagePath === '/auctions') { this.toggleAuctionDetail() }
                }}
                >
                {tabs}
            </Tabs>
        );
    };

    buildAdminTabs () {

        const tabObjs = [
            {
                icon: <PollIcon />,
                label: 'Results',
                link: 'results',
            },
            {
                icon: <AssignmentInd />,
                label: 'Donor Info',
                link: 'donor-info',
            },
        ];

        const currentPagePath = window.location.pathname; // e.g. '/auctions'

        const tabs = tabObjs.map(tabObj => {
            return this.buildTab(tabObj);
        });

        return (
            <Tabs
                initialSelectedIndex={tabs.findIndex(tab => tab.props['data-route'] === currentPagePath)}
                onChange={this.navigateToRoute}
                tabItemContainerStyle={{backgroundColor: blueGrey600}}
                >
                {tabs}
            </Tabs>
        );
    }

    render () {
        const { user, userPermissions, config, logout } = this.props;

        if (!userPermissions || Object.keys(userPermissions).length < 1) {
            return (
                <AppBar
                    title='Happiness Exchange'
                    iconElementLeft={
                        <div style={{
                                backgroundColor:'#fff',
                                padding:'2px',
                                marginTop:'-8px',
                                marginLeft:'-8px',
                                marginBottom:'-8px',
                            }}>
                            <img style={{height:'56px',width:'56px'}} alt="Eappiness Exchange logo" src={getImageForEnv('happinessexchange.png')} />
                        </div>
                    }
                >
                </AppBar>
            );
        }
        
        const iconMenu = this.buildIconMenu(userPermissions, { logout });
        
        const navigationTabs = this.buildNavigationTabs(userPermissions, config, this.toggleAuctionDetail);
        // const adminTabs = userPermissions.admin ? this.buildAdminTabs() : '';

        return (
            <div>
                
                {<AppBar
                    title={'Welcome, ' + user.displayName}
                    iconElementLeft={
                        <div style={{
                                backgroundColor:'#fff',
                                padding:'2px',
                                marginTop:'-8px',
                                marginLeft:'-8px',
                                marginBottom:'-8px',
                            }}>
                            <img style={{height:'56px',width:'56px'}} alt="Happiness Exchange logo" src={getImageForEnv('happinessexchange.png')} />
                        </div>
                    }
                    iconElementRight={iconMenu}
                >
                </AppBar>}

                {navigationTabs}

                {/* {adminTabs} */}

            </div>
        );  
    }
}

export default muiThemeable()(Navigation);