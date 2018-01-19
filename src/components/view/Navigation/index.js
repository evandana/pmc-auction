import React from 'react';

import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import AssignmentInd from 'material-ui-icons/AssignmentInd';
import ChromeReaderModeIcon from 'material-ui-icons/ChromeReaderMode';
import CreditCardIcon from 'material-ui-icons/CreditCard';
import RedeemIcon from 'material-ui-icons/Redeem';
import TimelineIcon from 'material-ui-icons/Timeline';
import LocalPlayIcon from 'material-ui-icons/LocalPlay';
import LocalOfferIcon from 'material-ui-icons/LocalOffer';
import MoodIcon from 'material-ui-icons/Mood';
import PollIcon from 'material-ui-icons/Poll';
import PeopleIcon from 'material-ui-icons/People';
import PersonIcon from 'material-ui-icons/Person';
import WhatsHotIcon from 'material-ui-icons/Whatshot';
import StarIcon from 'material-ui-icons/Star';
import AddCircleIcon from 'material-ui-icons/AddCircle';

import { getImageForEnv } from 'static/images/index'

import './styles.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.paper,
    },
  });

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToRoute = this.navigateToRoute.bind(this);
    }
    
    buildIconMenu (permissions, actions) {
        const { logout } = actions;
        if (permissions.basic) {
            return (
                <Menu
                    iconButtonElement={<IconButton><ExpandMoreIcon /></IconButton>}
                    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                >
                    <Menu onTouchTap={logout} primaryText="Logout" />
                </Menu>
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
                href={'/'+link}
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
                value={tabs.findIndex(tab => tab.props['data-route'] === currentPagePath)}
                onChange={this.navigateToRoute}
                // tabItemContainerStyle={{backgroundColor: cyan600}}
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
                value={tabs.findIndex(tab => tab.props['data-route'] === currentPagePath)}
                // onChange={this.navigateToRoute}
                >
                {tabs}
            </Tabs>
        );
    }

    render () {
        const { user, userPermissions, config, logout, openLoginModal, classes } = this.props;

        if (!userPermissions || Object.keys(userPermissions).length < 1) {
            return <div>Nav will be enabled once you log in</div>;
        }

        const titleLink = (<Link className="navigation__title-link" to="/">Welcome, {user.persona}</Link>);
        const iconMenu = this.buildIconMenu(userPermissions, { logout, openLoginModal });
        
        const navigationTabs = this.buildNavigationTabs(userPermissions, config);
        const adminTabs = userPermissions.admin ? this.buildAdminTabs() : '';

        return (
            <div className={classes.root}>
                
                {<AppBar
                    position='static'
                    title={titleLink}
                    children={
                        <div style={{
                                backgroundColor:'#fff',
                                padding:'2px',
                                marginTop:'-8px',
                                marginLeft:'-8px',
                                marginBottom:'-8px',
                            }}>
                            <img style={{height:'56px',width:'56px'}} src={getImageForEnv('happinessexchange.png')} />
                        </div>
                    }
                    classes={{}}
                    // iconElementRight={iconMenu}
                >
                </AppBar>}

                {navigationTabs}

                {adminTabs}

            </div>
        );  
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default Navigation;
export default withStyles(styles)(Navigation);