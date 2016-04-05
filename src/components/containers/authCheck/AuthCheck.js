// Libraries
import React from 'react';
// Styles
// import './header.scss';
// Application Components

export default class AuthCheck({ children }) {

    const a = true;


    const render = () => {

        let val = ''

        if ( a ) {
            val = {children}
        } else {
            val = 'not authorized'
        }


        return (
            <div>
                {val}
            </div>
        )
    }

    function validateLogin () {

    }


    return {
        render,
        validateLogin
    }
}

// export function validateLogin () {
//     console.log('validate called')
// }