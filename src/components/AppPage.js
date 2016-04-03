import fetch from 'isomorphic-fetch'
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


// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_REDDIT = 'SELECT_REDDIT'
// export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

// export function selectReddit(reddit) {
//   return {
//     type: SELECT_REDDIT,
//     reddit
//   }
// }

// export function invalidateReddit(reddit) {
//   return {
//     type: INVALIDATE_REDDIT,
//     reddit
//   }
// }

// function requestPosts(reddit) {
//   return {
//     type: REQUEST_POSTS,
//     reddit
//   }
// }

// function receivePosts(reddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     reddit: reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`https://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }

// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }


// import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'
// import Picker from '../components/Picker'
// import Posts from '../components/Posts'

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleRefreshClick = this.handleRefreshClick.bind(this)
//   }

//   componentDidMount() {
//     const { dispatch, selectedReddit } = this.props
//     dispatch(fetchPostsIfNeeded(selectedReddit))
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.selectedReddit !== this.props.selectedReddit) {
//       const { dispatch, selectedReddit } = nextProps
//       dispatch(fetchPostsIfNeeded(selectedReddit))
//     }
//   }

//   handleChange(nextReddit) {
//     this.props.dispatch(selectReddit(nextReddit))
//   }

//   handleRefreshClick(e) {
//     e.preventDefault()

//     const { dispatch, selectedReddit } = this.props
//     dispatch(invalidateReddit(selectedReddit))
//     dispatch(fetchPostsIfNeeded(selectedReddit))
//   }

//   render() {
//     const { selectedReddit, posts, isFetching, lastUpdated } = this.props
//     const isEmpty = posts.length === 0
//     return (
//       <div>
//         <Picker value={selectedReddit}
//                 onChange={this.handleChange}
//                 options={[ 'reactjs', 'frontend' ]} />
//         <p>
//           {lastUpdated &&
//             <span>
//               Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
//               {' '}
//             </span>
//           }
//           {!isFetching &&
//             <a href="#"
//                onClick={this.handleRefreshClick}>
//               Refresh
//             </a>
//           }
//         </p>
//         {isEmpty
//           ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
//           : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
//               <Posts posts={posts} />
//             </div>
//         }
//       </div>
//     )
//   }
// }

// App.propTypes = {
//   selectedReddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

// function mapStateToProps(state) {
//   const { selectedReddit, postsByReddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsByReddit[selectedReddit] || {
//     isFetching: true,
//     items: []
//   }

//   return {
//     selectedReddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }

// export default connect(mapStateToProps)(App)










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
