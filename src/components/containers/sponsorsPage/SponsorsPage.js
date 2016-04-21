import React from 'react'

import MobileTearSheet from '../mobileTearSheet/mobile-tear-sheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors, { pinkA200, transparent } from 'material-ui/lib/styles/colors';

import { getImageForEnv } from '../../../images/index'

import './_sponsorsPage.scss'

const SponsorsPage = ( {prop} ) => {

    const sponsors = [
        {
            name: 'Cambridge Brewing Company',
            link: 'http://www.cambridgebrewingcompany.com/',
            subtext: 'Amazing local brews',
            image: getImageForEnv('sponsor-cbc.png')
        },
        {
            name: 'Landry\'s Bicycles',
            link: 'http://www.landrys.com/',
            subtext: 'The right number of bikes is N+1',
            image: getImageForEnv('sponsor-landrys.png')
        }
    ]

    function goToSponsor(link) {
        var win = window.open(link, '_blank');
        win.focus();
    }
    // <Divider inset={true} />
    // secondaryTextLines={2}

    return (
        <div className="sponsors-page">
            <h1>Sponsors</h1>
            <p>Generous sponsors make this possible. We're proud to support these community-focused businesses.</p>
            <MobileTearSheet>
                <List>
                { sponsors.map( sponsor => {
                    return (
                        <ListItem
                            onTouchTap={ evt => {
                                goToSponsor(sponsor.link);
                            }}
                            primaryText={sponsor.name}
                            secondaryText={sponsor.subtext}
                            secondaryTextLines={2}
                            key={sponsor.name}
                            leftIcon={<ActionGrade color={pinkA200} />}
                            rightAvatar={<Avatar src={sponsor.image} backgroundColor={transparent} />}
                        />
                    )
                    })
                }
                </List>
              </MobileTearSheet>
          </div>
    )
}

export default SponsorsPage;