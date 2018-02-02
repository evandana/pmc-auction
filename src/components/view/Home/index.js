import React from 'react';

import { getImageForEnv } from 'static/images/index'

const Home = (props) => {

    const { user, userPermissions, openLoginModal } = props;

    let view = '';

    if (userPermissions.basic) {
        view = (
            <div className="row middle-sm">

                <section className="col-xs-12 col-sm-4 col-md-6" style={{textAlign:'center'}}>
                    <img
                        style={{maxWidth:'calc(100% - 4em)',maxHeight:'calc(100%-4em)', padding:'2em'}}
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

                    <p>Live the evening of February [TBD].</p>

                    <p>For funsies, you will be seen by other bidders as "{user.persona}".</p>
    
                    <h2>Goals</h2>
                    <ul>
                        <li>Honor the skills and talents of auction donors</li>
                        <li>Connect people under shared interests</li>
                        <li>Raise money towards treating and curing cancer</li>
                    </ul>

                </section>

            </div>
        );
    } else {
        view = (
            <div>
                Welcome to the Happiness Exchange 2018 site.
                Please <span className="fake-link" onClick={openLoginModal}>Login</span> to view the auctions.
            </div>
        );
    }

    return (
        <div className='page'>
            <div className='text-content'>
                {view}
            </div>
        </div>
    );
    
}

export default Home;
