import fetch from 'isomorphic-fetch'
import React from 'react'

import Header from '../header/Header'
import Footer from '../footer/Footer'

// Material-ui
import {deepOrange500} from 'material-ui/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider } from 'material-ui/styles/MuiThemeProvider';

import './_appPage.scss'


const muiTheme = getMuiTheme({
  palette: {
      accent1Color: deepOrange500,
  },
});


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
