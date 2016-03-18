import React from 'react'
import { Link, browserHistory } from 'react-router'

import Header from './Header'

export default function AppPage({ children }) {

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}