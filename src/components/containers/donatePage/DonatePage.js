import React from 'react'

import './_donatePage.scss'

const DonatePage = ( {prop} ) => {

    return (
        <div className="donate-page">
            <h3>100% of every dollar goes to DFCI</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Cash (preferred)</td>
                        <td>No processing fees</td>
                    </tr>
                    <tr>
                        <td>Venmo (preferred)</td>
                        <td><a href="http://www.venmo.com/EvanDana">www.venmo.com/EvanDana</a></td>
                    </tr>
                    <tr>
                        <td>PMC Pages</td>
                        <td>
                            Tax-deductable <br/>
                            <a href="http://profile.pmc.org/ed0074">Evan's page</a> <br/>
                            <a href="http://profile.pmc.org/cl0214">Courtney's page</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DonatePage