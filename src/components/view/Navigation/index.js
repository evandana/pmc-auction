import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './styles.css';

const buildIconMenu = (permissions, actions) => {  
    const { logout } = actions;
    if (permissions.basic) {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem
                    containerElement={<Link to="/" />}
                    primaryText="Home"
                />
                <MenuItem
                    containerElement={<Link to="/auctions" />}
                    primaryText="Auctions"
                />
                {permissions.admin || permissions.seller ? ( 
                <MenuItem
                    containerElement={<Link to="/status" />}
                    primaryText="Status"
                />) : 
                ''}
                <MenuItem onTouchTap={logout} primaryText="Logout" />
            </IconMenu>
        );
    }
};

const Navigation = (props) => {
    const { userPermissions, logout, openLoginModal } = props;
    const titleLink = (<Link className="navigation__title-link" to="/">Happiness Exchange</Link>);
    const iconMenu = buildIconMenu(userPermissions, { logout, openLoginModal });
    return (
        <div>
            {<AppBar
                title={titleLink}
                showMenuIconButton={true}
                iconElementRight={iconMenu}
            >
            </AppBar>}
        </div>
    );
};

export default Navigation;