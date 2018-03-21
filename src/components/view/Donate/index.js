import React from 'react'
import FlatButton from 'material-ui/FlatButton';

const Donate = (props) => {

    return (
        <div className='page'>
            <div className='text-content'>
            
                <div className="row">
                    <div className="col-xs-12 col-sm-6" style={{paddingRight:'2em'}}>
                        <h3>Double your donation!</h3>
                        <FlatButton primary={true} href="https://venmo.com/EvanDana" label="Venmo: @evandana" target="_blank"></FlatButton>
                        <p>Thanks to a corporate match, your donation will go twice as far.</p>
                        <p>Check or cash also accepted.</p>
                    </div>
                    <div className="col-xs-12 col-sm-6" style={{paddingRight:'2em'}}>
                        <h3>Get a tax-deductible receipt from the PMC</h3>
                        <FlatButton primary={true} target="_blank" href='http://pmc.org/ed0074' label="PMC Site: pmc.org/ed0074"></FlatButton>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Donate;
