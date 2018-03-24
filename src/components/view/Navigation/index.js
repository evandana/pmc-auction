import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/styles/colors'

import PanToolIcon from 'material-ui/svg-icons/action/pan-tool';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import RedeemIcon from 'material-ui/svg-icons/action/redeem';
// import TimelineIcon from 'material-ui/svg-icons/action/timeline';
// import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
// import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
// import MoodIcon from 'material-ui/svg-icons/social/mood';
import PollIcon from 'material-ui/svg-icons/social/poll';
// import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
// import WhatsHotIcon from 'material-ui/svg-icons/social/whatshot';
// import StarIcon from 'material-ui/svg-icons/toggle/star';
// import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import Messages from 'components/controller/Messages';

import { getImageForEnv } from 'static/images/index'

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        // this.navigateToRoute = this.navigateToRoute.bind(this);
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
                    {permissions.admin && (
                        <MenuItem 
                            onClick={() => {
                                document.body.scrollTop = document.documentElement.scrollTop = 0;
                                this.props.history.push('donor-info')
                            }}
                            primaryText="Donor Info" 
                            />
                    )}
                </IconMenu>
            );
        }
    };

    navigateToRoute (link) {
        // navigate
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.props.history.push(link);
    };

    buildTab ({icon, label, active, link, style, value}) {
        return (
            <Tab
                label={label}
                data-route={'/'+link}
                icon={icon}
                key={link}
                style={style}
                value={value}
                onActive={activeTab => {
                    this.navigateToRoute(activeTab.props['data-route'])
                }}
            />
            );
    };

    buildNavigationTabs (location, permissions, config) {

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
                icon: <PanToolIcon />, // alt: LocalPlayIcon
                label: 'Auction',
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


        const tabs = tabObjs
            .filter(tabObj => {
                return !tabObj.permissionsRequired || tabObj.permissionsRequired.every(reqPermission => permissions[reqPermission] === true);
            })
            .filter(tabObj => {
                return !tabObj.configRequired || tabObj.configRequired.every(reqConfig => config[reqConfig] === true);
            })
            .map((tabObj, i) => {
                tabObj.value = i;
                return this.buildTab(tabObj);
            });
        
        const currentPagePath = location.pathname; // e.g. '/auctions'

        const initialSelectedIndex = tabs
            .findIndex(tab => {
                if (tab.props['data-route'] === '/about') {
                    return tab.props['data-route'] === currentPagePath || '/' === currentPagePath;
                } else if (tab.props['data-route'] === '/auctions') {
                    return currentPagePath.indexOf('/auctions') > -1;
                } else {
                    return tab.props['data-route'] === currentPagePath;
                }
            }); 

        return (
            <Tabs
                inkBarStyle={{background: this.themePalette.highlight1Color}}
                value={initialSelectedIndex}
                tabItemContainerStyle={{backgroundColor: this.themePalette.primary2Color}}
                >
                {tabs}
            </Tabs>
        );
    };

    render () {
        const { user, userPermissions, config, logout, router} = this.props;

        const location = router.location;

        if (!userPermissions || Object.keys(userPermissions).length < 1 || !userPermissions.basic || userPermissions.error ) {
            return (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        zIndex:100,
                    }}
                    >
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
                                <img style={{height:'56px',width:'56px'}} alt="Happiness Exchange logo" src={getImageForEnv('happinessexchange.png')} />
                            </div>
                        }
                    >
                    </AppBar>
                    <Messages />
                </div>
            );
        }
        
        const iconMenu = this.buildIconMenu(userPermissions, { logout });
        
        const navigationTabs = this.buildNavigationTabs(location, userPermissions, config);

        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex:100,
                }}
                >
                
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

                <Messages />

                {navigationTabs}

            </div>
        );  
    }
}

export default muiThemeable()(Navigation);