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
        // {
        //     name: 'Landry\'s Bicycles',
        //     link: 'http://www.landrys.com/',
        //     subtext: 'Our gracious hosts',
        //     image: getImageForEnv('sponsor-landrys.png'),
        //     color: amber500
        // },
        // {
        //     name: 'OTTO Pizza',
        //     link: 'http://www.ottoportland.com/',
        //     subtext: 'A little slice of heaven',
        //     image: getImageForEnv('ottos.png'),
        //     color: amber500
        // },
        {
            name: 'Janji',
            link: 'https://runjanji.com/',
            subtext: 'Performance running apparel that connects people',
            image: getImageForEnv('janji-logo.png'),
            color: amber500
        },
        {
            name: 'Holly Broussard and Matthew Kihm',
            subtext: 'Our incredible graphic designers',
            image: getImageForEnv('happinessexchange.png'),
            color: amber500
        },
        {
            name: 'Broadsheet Coffee Roasters',
            link: 'https://www.broadsheetcoffee.com/',
            subtext: 'Locally roasted beans; best espresso in town',
            image: getImageForEnv('broadsheet-logo.png'),
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
            name: 'Second Chance Ranch',
            link: 'https://www.secondchanceranchrescue.com/',
            subtext: 'Doggie boarding / find your rescue dog',
            image: getImageForEnv('second-chance-ranch-logo.png'),
            color: amber500
        },

       
        

        // {
        //     name: 'Cambridge Brewing Company',
        //     link: 'http://www.cambridgebrewingcompany.com/',
        //     subtext: 'Amazing local brews',
        //     image: getImageForEnv('sponsor-cbc.png'),
        //     color: yellow600
        // },
        // {
        //     name: 'Sky Zone',
        //     link: 'http://www.skyzone.com/',
        //     subtext: 'Bounce with me now...',
        //     image: getImageForEnv('skyzone-logo.png'),
        //     color: yellow400
        // },
        // {
        //     name: 'Harpoon Brewery',
        //     link: 'http://www.harpoonbrewery.com/',
        //     subtext: 'Love Beer. Love Life.',
        //     image: getImageForEnv('harpoon.jpg'),
        //     color: yellow400
        // },
        // {
        //     name: 'Bantam Cider',
        //     link: 'http://www.bantamcider.com/',
        //     subtext: 'Local Wunderkind',
        //     image: getImageForEnv('bantam.png'),
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
    // <Divider inset={true} />
    // secondaryTextLines={2}

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Sponsors</h1>
                <p>Generous sponsors make this possible. We're proud to support these community-focused businesses.</p>
                <List>
                    {sponsors.map(sponsor => {
                        const style = {
                            fill: sponsor.color
                        }

                        return (
                            <ListItem
                                onTouchTap={evt => {
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
        </div>
    )
}

export default Sponsors;

// import React from 'react'

// const Sponsors = (props) => {

//     const { ...rest } = props;

//     return (
//         <h2>Sponsors</h2>
//     );
// }

// export default Sponsors;
