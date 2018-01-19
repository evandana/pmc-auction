import React from 'react'

import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import Paper from 'material-ui/Paper';

const Donate = (props) => {

    const { ...rest } = props;

    return (
        <div className='page'>
            <div className='text-content'>
                <h1>Donate</h1>

                <h3>Double your donation!</h3>
                <p>Venmo to @evandana, check to Evan Dana, or cash</p>
                <p>Thanks to a corporate match, your donation will go twice as far</p>

                <h3>Get a tax-deductible receipt from the PMC</h3>
                <p>Donate online at <Link to='http://pmc.org/ed0074'><Button label="pmc.org/ed0074" children=''></Button></Link></p>

            </div>
        </div>
    );
}

export default Donate;
