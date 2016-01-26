import '../bower_components/font-awesome/css/font-awesome.css'
// import '../bower_components/lato-font/css/lato-font.css'
import './less/main.less'

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Route, Router } from 'react-router'
import { Provider, connect } from 'react-redux'

import * as actions from './js/actions.js'
import reducer from './js/reducers.js'

import _Login from './js/components/Login.js'
import _Browse from './js/components/Browse.js'

import Web from './js/web'
window.Web = Web

let store =  applyMiddleware(thunkMiddleware)(createStore)(reducer)
window.store = store
let Browse = connect(state => state)(_Browse)
let Login = connect(state => state)(_Login)
console.log(window.location.host)
let web = new Web(`${window.location.protocol}//${window.location.host}/rpc`)
if (window.location.host === 'localhost:8080') {
  web = new Web('http://localhost:9001/rpc')
}

window.web = web
store.dispatch(actions.setWeb(web))

function authNeeded(nextState, replace) {
  if (!web.LoggedIn()) {
    replace(
      nextState,
      '/'
    )
    return
  }
}

function authNotNeeded(nextState, replace) {
  if (web.LoggedIn()) {
    replace(
      nextState,
      '/browse'
    )
    return
  }
}

ReactDOM.render((
  <Provider store={store} web={web}>
    <Router history={createBrowserHistory()}>
      <Route path='/' component={Login} onEnter={authNotNeeded} />
      <Route path='/browse' component={Browse} onEnter={authNeeded} />
      <Route path='/browse/:bucketName' component={Browse} onEnter={authNeeded} />
    </Router>
  </Provider>
), document.getElementById('root'))
