import './less/main.less'

import './js/functions.js'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Route, Router, IndexRoute } from 'react-router'

// import Routes from './js/components/Routes.js'
import Login from './js/components/Login.js'
// import Browse from './js/components/Login.js'

// ReactDOM.render((
//   <Router history={createBrowserHistory()}>
//     <Route path='/' component={Login}>
//       <IndexRoute component={Login} />
//       <Route path='/browse'component={Browse} />
//     </Route>
//   </Router>
// ), document.getElementById('app'))

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Login}>
    </Route>
  </Router>
), document.getElementById('app'))
