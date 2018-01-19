import React from 'react'

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
                <p>Donate online at <a href="https://pmc.org/ED0074">pmc.org/ED0074</a></p>

            </div>
        </div>
    );
}

export default Donate;
