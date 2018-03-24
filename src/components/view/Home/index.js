import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Login from 'components/controller/Login'
import DonorCodeForm from 'components/controller/DonorCodeForm'

import { getImageForEnv } from 'static/images/index'

const Home = (props) => {

    const { user, userPermissions, config, muiTheme } = props;

    const themePalette = muiTheme.palette;

    const pageWrapperStyles = {
        width: '100%',
        marginTop: !!config.MESSAGE_GLOBAL && config.MESSAGE_GLOBAL.length > 0 ? 136 + 36 : 136,
        marginBottom: 39,
    }

    return (
        <div className='page-wrapper' style={pageWrapperStyles}>
            <div className='page'>
                <div className='text-content'>
                    {!userPermissions.basic ? (
                        <div>
                            <Login />
                        </div>
                    ) : (
                            <div className="row middle-sm">

                                <section className="col-xs-12 col-sm-4 col-md-6" style={{ textAlign: 'center' }}>
                                    <img
                                        style={{ maxWidth: 'calc(100% - 4em)', maxHeight: 'calc(100%-4em)', padding: '.5em 2em' }}
                                        src={getImageForEnv('he-lockup.png')}
                                        alt="Happiness Exchange logo"
                                    />
                                </section>

                                <section className="col-xs-12 col-sm-8 col-md-6">

                                    <h2>Welcome!</h2>

                                    <p>The Happiness Exchange is a friendly auction of time and talent benefitting Cancer Research.</p>

                                    <p>Thank you to those who have supported this cause in the past!
                            This will be my 6th year riding the PMC, in honor of my father and countless other family and friends.</p>

                                    <p>100% of every donated dollar will go to Dana Farber Cancer Institute, where my dad recieved exceptional care.
                            Your help is greatly appreciated in my goal of raising over $8,000 for this August bike ride.</p>

                                    <h2>Bidding</h2>

                                    <p>Live on Friday March 30th, in person or online.</p>

                                    <p>For funsies, you will be seen by other bidders as "<span style={{color:themePalette.accent1Color}}>{user.persona}</span>".</p>

                                    <h2>Goals</h2>
                                    <ul>
                                        <li>Honor the skills and talents of auction donors</li>
                                        <li>Connect people under shared interests</li>
                                        <li>Raise money towards treating and curing cancer</li>
                                    </ul>

                                    {user.permissions.donor ? '' : (
                                        <section>
                                            <h2>Auction Donors</h2>

                                            <p>If you would like to create an auction item, please enter the access code here:</p>

                                            <DonorCodeForm
                                                className="col-xs-12"
                                                style={{ paddingLeft: '1em' }}
                                            />
                                        </section>
                                    )}

                                </section>

                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default muiThemeable()(Home);
