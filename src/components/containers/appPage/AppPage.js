import fetch from 'isomorphic-fetch'
import React from 'react'

import Header from '../header/Header'
import Footer from '../footer/Footer'


// Material-ui
import {
    deepOrange500,
    getMuiTheme,
    MuiThemeProvider
    } from 'material-ui';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

import './_appPage.scss'

export default function AppPage({ children }) {

    return (
        <MuiThemeProvider muiTheme={muiTheme}>
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
