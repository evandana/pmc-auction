import React from 'react'

import Header from './Header'

export default function AppPage({ children }) {

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}





// let app = {

//     run () {
//         UserStore.authCheck(this.authCallback.bind(this));
//     },

//     authCallback (authData) {
//         if (authData) {
//             UserStore.setUser(authData)
//                 .then( () => { this.loadListingPage() });
//         } else {
//             this.loadAuthPage();
//         }

//     },

//     loadAuthPage () {
//         ReactDOM.render(
//             <AuthPage />,
//             document.getElementById('app-page')
//         );
//     },

//     loadListingPage () {
//         ReactDOM.render(
//               <Router history={browserHistory}>
//                 <Route path="/" component={ListingPage}>
//                     <Route path="listingPage" component={ListingPage}/>
//                 </Route>

//                 <Route path="*" component={ListingPage}/>
//               </Router>,
//             document.getElementById('app-page')
//         );
//     }
// };
//
// app.run();
