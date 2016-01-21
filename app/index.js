import '../bower_components/font-awesome/css/font-awesome.css'
import '../bower_components/lato-font/css/lato-font.css'
import './less/main.less'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Route, Router } from 'react-router'
import { Provider, connect } from 'react-redux'

import auth from './js/auth.js'
import reducer from './js/reducers.js'

import Login from './js/components/Login.js'
import _Browse from './js/components/Browse.js'

let store =  applyMiddleware(thunkMiddleware)(createStore)(reducer)

let Browse = connect(state => state)(_Browse)

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
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path='/' component={Login} onEnter={authNotNeeded} />
      <Route path='/browse' component={Browse} onEnter={authNeeded} />
      <Route path='/browse/:bucketName' component={Browse} onEnter={authNeeded} />
    </Router>
  </Provider>
), document.getElementById('root'))
