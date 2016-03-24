import React from 'react'

import Auctions from './containers/auctions/Auctions'

export default function AuctionsPage({ children }) {

    const render = () => {
        return (
            <div>
                <Auctions />
            </div>
        )
    }

    return {
        render
    }
}