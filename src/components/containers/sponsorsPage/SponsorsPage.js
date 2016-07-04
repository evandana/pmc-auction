import React from 'react'

import MobileTearSheet from '../mobileTearSheet/mobile-tear-sheet';

import {
    ActionGrade,
    Avatar,
    Colors, pinkA200, amber500, yellow600, yellow400, transparent,
    Divider,
    List,
    ListItem
    } from 'material-ui';

import { getImageForEnv } from '../../../images/index'

import './_sponsorsPage.scss'

const SponsorsPage = ( {prop} ) => {

    const sponsors = [
        {
            name: 'Landry\'s Bicycles',
            link: 'http://www.landrys.com/',
            subtext: 'Our gracious hosts',
            image: getImageForEnv('sponsor-landrys.png'),
            color: amber500
        },
        {
            name: 'OTTO Pizza',
            link: 'http://www.ottoportland.com/',
            subtext: 'A little slice of heaven',
            image: getImageForEnv('ottos.png'),
            color: amber500
        },
        {
            name: 'Holly Broussard and Matthew Kihm',
            subtext: 'Our incredible graphic designers',
            image: getImageForEnv('happinessexchange.png'),
            color: amber500
        },
        {
            name: 'Dave Thomas',
            link: 'http://github.com/dwthomas77',
            subtext: 'If he codes it, they will bid',
            image: '', //getImageForEnv('dave.png'),
            color: amber500
        },
        {
            name: 'Cambridge Brewing Company',
            link: 'http://www.cambridgebrewingcompany.com/',
            subtext: 'Amazing local brews',
            image: getImageForEnv('sponsor-cbc.png'),
            color: yellow600
        },
        {
            name: 'Sky Zone',
            link: 'http://www.skyzone.com/',
            subtext: 'Bounce with me now...',
            image: getImageForEnv('skyzone-logo.png'),
            color: yellow400
        },
        {
            name: 'Harpoon Brewery',
            link: 'http://www.harpoonbrewery.com/',
            subtext: 'Love Beer. Love Life.',
            image: getImageForEnv('harpoon.jpg'),
            color: yellow400
        },
        {
            name: 'Bantam Cider',
            link: 'http://www.bantamcider.com/',
            subtext: 'Local Wunderkind',
            image: getImageForEnv('bantam.png'),
            color: yellow400
        },
        {
            name: 'Washington Square Tavern',
            link: 'http://washingtonsquaretavern.com/',
            subtext: 'For a good time, call Gerry',
            image: getImageForEnv('washsq.png'),
            color: yellow400
        },
        {
            name: 'Launch Trampoline Park',
            link: 'http://launchwatertown.com/',
            subtext: 'Boing!',
            image: getImageForEnv('launch.png'),
            color: yellow400
        },
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
                <List>
                { sponsors.map( sponsor => {
                    const style = {
                        fill: sponsor.color
                    }

                    return (
                        <ListItem
                            onTouchTap={ evt => {
                                goToSponsor(sponsor.link);
                            }}
                            primaryText={sponsor.name}
                            secondaryText={sponsor.subtext}
                            secondaryTextLines={2}
                            key={sponsor.name}
                            leftIcon={<ActionGrade style={style} />}
                            rightAvatar={<Avatar src={sponsor.image} backgroundColor={transparent} />}
                        />
                    )
                    })
                }
                </List>
          </div>
    )
}

export default SponsorsPage;