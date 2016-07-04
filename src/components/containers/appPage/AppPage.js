import fetch from 'isomorphic-fetch'
import React from 'react'

import Header from '../header/Header'
import Footer from '../footer/Footer'


// Material-ui
import {
    deepOrange500,
    MuiThemeProvider
    } from 'material-ui';

import './_appPage.scss'

export default function AppPage({ children }) {

    return (
        <MuiThemeProvider>
            <div>
                <Header />
                <div className="app-page__main-content">
                    {children}
                </div>
                <Footer />
            </div>
        </MuiThemeProvider>
    );
}
