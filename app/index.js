import '../bower_components/font-awesome/css/font-awesome.css'
import '../bower_components/lato-font/css/lato-font.css'
import './less/main.less'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Route, Router } from 'react-router'

import auth from './js/auth.js'

import Login from './js/components/Login.js'
import Browse from './js/components/Browse.js'

function authNeeded(nextState, replace) {
  if (!auth.loggedIn()) {
    replace(
      nextState,
      '/'
    )
    return
  }
}

function authNotNeeded(nextState, replace) {
  if (auth.loggedIn()) {
    replace(
      nextState,
      '/browse'
    )
    return
  }
}

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Login} onEnter={authNotNeeded} />
    <Route path='/browse' component={Browse} onEnter={authNeeded} />
  </Router>
), document.getElementById('root'))
