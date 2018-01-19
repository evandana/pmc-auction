import React from 'react';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper'

const Home = (props) => {

    const { userPermissions, openLoginModal } = props;

    let view = '';

    if (userPermissions.basic) {
        view = (
            <div>
                <p>Welcome!</p>

                <p>The Happiness Exchange is a friendly auction of time and talent benefitting Cancer Research.</p>

                <p>Thank you to those who have supported this cause in the past!
                This will be my 6th year riding the PMC, in honor of my father and countless other family and friends.
                [full story].</p>

                <p>100% of every donated dollar will go to Dana Farber Cancer Institute, where my dad recieved exceptional care.
                Your help is greatly appreciated in my goal of raising over $8,000 for this August bike ride.
                </p>

                <p>Bidding will be live the evening of February [TBD].</p>
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
                <h1>About</h1>
                {view}
            </div>
        </div>
    );
    
}

export default Home;