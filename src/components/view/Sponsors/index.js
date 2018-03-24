import React from 'react'

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import { amber500, transparent } from 'material-ui/styles/colors';

import { getImageForEnv } from 'static/images/index'

import './sponsors.css'

const Sponsors = ({ prop }) => {

    const sponsors = [
        {
            name: 'Janji (the event host)',
            link: 'https://runjanji.com/',
            subtext: 'Performance running apparel that connects people',
            image: getImageForEnv('janji-logo.png'),
        },
        {
            name: 'Holly Broussard and Matthew Kihm',
            subtext: 'Our incredible graphic designers',
            image: getImageForEnv('happinessexchange.png'),
            background: 'Honeydew',
        },
        {
            name: 'Broadsheet Coffee Roasters',
            link: 'https://www.broadsheetcoffee.com/',
            subtext: 'Locally roasted beans; best espresso in town',
            image: getImageForEnv('broadsheet-logo.png'),
        },
        {
            name: 'Sky Zone',
            link: 'http://www.skyzone.com/',
            subtext: 'Bounce with me now...',
            image: getImageForEnv('skyzone-logo.png'),
        },
        {
            name: 'Dave Thomas',
            link: 'http://github.com/dwthomas77',
            subtext: 'If he codes it, they will bid',
            image: '',
            background: 'DarkSlateGray',
            textColor: 'Gainsboro'
        },
        {
            name: 'Bone Up Brewing',
            link: 'https://www.boneup.beer/',
            subtext: 'There\'s a coloring contest and flights come with a fruit roll up',
            image: getImageForEnv('bone-up-logo.png'),
        },
        {
            name: 'Saus',
            link: 'https://www.sausboston.com/',
            subtext: 'Beer and Belgian street food: waffles, fries, and more',
            image: getImageForEnv('saus-logo.png'),
        },
        {
            name: 'Second Chance Ranch',
            link: 'https://www.secondchanceranchrescue.com/',
            subtext: 'Doggie boarding / find your rescue dog',
            image: getImageForEnv('second-chance-ranch-logo.png'),
        },
        {
            name: 'Landry\'s Bicycles',
            link: 'http://www.landrys.com/',
            subtext: 'Where bikes come from',
            image: getImageForEnv('sponsor-landrys.png'),
            background: 'Linen'
        },
        {
            name: 'Bantam Cider',
            link: 'http://www.bantamcider.com/',
            subtext: 'Local Wunderkind',
            image: getImageForEnv('bantam.png'),
            background: 'Beige'
        },
        {
            name: 'Floyd\'s 99 Barbershop - Cambridge',
            link: 'https://www.floydsbarbershop.com/cambridge/',
            subtext: 'For a fresh fade, call Nick',
            image: getImageForEnv('floyds.png'),
            background: 'LightGray',
        },
        {
            name: 'Winter Hill Brewing',
            link: 'http://winterhillbrewing.com/',
            subtext: 'Bratwurst and Darlin IPA combo, FTW',
            image: getImageForEnv('whb.png'),
            background: 'DimGray'
        },

        
        // {
        //     name: 'Harpoon Brewery',
        //     link: 'http://www.harpoonbrewery.com/',
        //     subtext: 'Love Beer. Love Life.',
        //     image: getImageForEnv('harpoon.jpg'),
        //     color: yellow400
        // },
        // {
        //     name: 'Washington Square Tavern',
        //     link: 'http://washingtonsquaretavern.com/',
        //     subtext: 'For a good time, call Gerry',
        //     image: getImageForEnv('washsq.png'),
        //     color: yellow400
        // },
        // {
        //     name: 'Launch Trampoline Park',
        //     link: 'http://launchwatertown.com/',
        //     subtext: 'Boing!',
        //     image: getImageForEnv('launch.png'),
        //     color: yellow400
        // },
    ]


    function goToSponsor(link) {
        var win = window.open(link, '_blank');
        win.focus();
    }

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Sponsors</h1>
                <p>Generous sponsors make this possible. We're proud to support these community-focused businesses.</p>
                <List>
                    {sponsors.map(sponsor => {

                        return (
                            <ListItem
                                onTouchTap={evt => {
                                    goToSponsor(sponsor.link);
                                }}
                                primaryText={sponsor.name}
                                secondaryText={sponsor.subtext}
                                secondaryTextLines={2}
                                key={sponsor.name}
                                leftIcon={
                                    !sponsor.image ? 
                                    <Avatar style={{ height:40, width:40 }} backgroundColor={sponsor.background || transparent}>
                                        <div style={{textAlign:'center', height:'100%', marginTop:12, color: sponsor.textColor || 'White'}}>{sponsor.name.split(' ').map(word => word[0] ).join('')}</div>
                                    </Avatar> : (
                                    <Avatar style={{ height:40, width:40 }} size={40} src={sponsor.image} backgroundColor={sponsor.background || transparent} />
                                )}
                            />
                        )
                    })
                    }
                </List>
            </div>
        </div>
    )
}

export default Sponsors;
