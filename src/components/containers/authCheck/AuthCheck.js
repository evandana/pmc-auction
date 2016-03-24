// Libraries
import React from 'react';
// Styles
// import './header.scss';
// Application Components

export default function AuthCheck({ children }) {

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

    return {
        render
    }
}