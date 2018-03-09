import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

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

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.themePalette = this.props.muiTheme.palette;
    }

    render () {
        const { config } = this.props;

        return (
            <div>
                {config.MESSAGE_GLOBAL && (
                    <div style={{
                        width: '100%'
                    }}> 
                        <RaisedButton
                            buttonStyle={{background: this.themePalette.warningColor}}
                            labelStyle={{color: this.themePalette.canvasColor}}
                            label={config.MESSAGE_GLOBAL}
                            fullWidth={true}
                            />
                    </div>
                )}
                    
                <Dialog
                    title="Important Message"
                    modal={false}
                    open={!!config.MESSAGE_ALERT && config.MESSAGE_ALERT.length > 0}
                    >
                    {config.MESSAGE_ALERT}
                </Dialog>

            </div>
        );  
    }
}

export default muiThemeable()(Messages);