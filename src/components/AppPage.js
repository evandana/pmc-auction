import fetch from 'isomorphic-fetch'
import React from 'react'

import Header from './containers/header/Header'
import Footer from './containers/footer/Footer'

export default function AppPage({ children }) {

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
