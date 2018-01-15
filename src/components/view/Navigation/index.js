import React from 'react';

import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/styles/colors'

import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import RedeemIcon from 'material-ui/svg-icons/action/redeem';
import TimelineIcon from 'material-ui/svg-icons/action/timeline';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
import MoodIcon from 'material-ui/svg-icons/social/mood';
import PollIcon from 'material-ui/svg-icons/social/poll';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
import WhatsHotIcon from 'material-ui/svg-icons/social/whatshot';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToRoute = this.navigateToRoute.bind(this);
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
        this.props.history.push(tabEl.props['data-route']);
    };

    buildTab ({icon, label, active, link}) {
        return (
            <Tab
                label={label}
                data-route={'/'+link}
                icon={icon}
                key={link}
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
                label: 'Sponsors',
                link: 'sponsors',
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
                tabItemContainerStyle={{backgroundColor: cyan600}}
                >
                {tabs}
            </Tabs>
        );
    };

    buildAdminTabs () {

        const tabObjs = [
            // {
            //     icon: <AddCircleIcon />,
            //     label: 'Create Auction',
            //     link: 'create-auction',
            // },
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
        const { userPermissions, config, logout, openLoginModal } = this.props;

        const titleLink = (<Link className="navigation__title-link" to="/">Happiness Exchange</Link>);
        const iconMenu = this.buildIconMenu(userPermissions, { logout, openLoginModal });
        
        const navigationTabs = this.buildNavigationTabs(userPermissions, config);
        const adminTabs = userPermissions.admin ? this.buildAdminTabs() : '';

        return (
            <div>
                
                {<AppBar
                    title={titleLink}
                    showMenuIconButton={true}
                    iconElementRight={iconMenu}
                >
                </AppBar>}

                {navigationTabs}

                {adminTabs}

            </div>
        );  
    }
}

export default Navigation;