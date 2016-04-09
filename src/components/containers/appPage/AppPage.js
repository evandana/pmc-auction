import fetch from 'isomorphic-fetch'
import React from 'react'

import Header from '../header/Header'
import Footer from '../footer/Footer'

import './_appPage.scss'

export default function AppPage({ children }) {

    return (
        <div>
            <Header />
            <div className="app-page__main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}
