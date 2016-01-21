import React from 'react'
import { connect } from 'react-redux'

import logo from '../../img/logo.svg'
import auth from '../auth.js'

import * as actions from '../actions'

let BucketList = ({ buckets, currentBucket, setCurrentBucket }) => {
  // console.log(this.props)
  const list = buckets.map((bucket, i) => {
    const active = bucket === currentBucket ? 'active' : ''
    return <li className={active} key={i} onClick={(e) => setCurrentBucket(e, bucket)}><a href="">{bucket}</a></li>
  })
  return (
    <div className="fes-list">
        <ul>
            {list}
        </ul>
    </div>
  )
}
BucketList = connect(state => state)(BucketList)

let ObjectsList = ({objects, selectObject, shareObject }) => {
  const list = objects.map((object, i) => {
    return (
      <div key={i} className="fesl-row">
          <div className="fesl-item" data-type={object.type}><a href="" onClick={(e) => selectObject(e, object)}>{object.name}</a></div>
          <div className="fesl-item">{object.type}</div>
          <div className="fesl-item">{object.size} GB</div>
          <div className="fesl-item">{object.lastModified}</div>
          <div className="fesl-item dropdown">
            <a href="" data-toggle="dropdown">
            <i className="fa fa-hdd-o"></i>
            </a>

            <ul className="dropdown-menu">
            <li><a href="" onClick={e => shareObject(e, object)}>Share</a></li>
            </ul>
          </div>
      </div>
    )
  })
  return (
    <div>{list}</div>
  )
}
ObjectsList = connect(state => state)(ObjectsList)

export default class Browse extends React.Component {
  setCurrentBucket(e, bucket) {
    e.preventDefault()
    if (bucket == this.props.currentBucket) return
    this.props.dispatch(actions.setCurrentBucket(bucket))
  }
  selectObject(e, object) {
    e.preventDefault()
    console.log('select', object)
  }
  shareObject(e, object) {
    e.preventDefault()
    console.log('share', object)
  }
  logout() {
    auth.logout(() => {
      this.props.history.pushState(null, '/')
    })
  }
  render() {
    return (
      <div className="file-explorer">
          <div className="fe-sidebar">
              <div className="fes-header clearfix">
                  <img src={logo} alt=""/>
                  <h2 className="fe-h2">Minio Browser</h2>
              </div>

              <BucketList setCurrentBucket={this.setCurrentBucket.bind(this)} />

              <div className="fes-host">
                  <i className="fa fa-globe"></i> 192.168.200.205
              </div>
          </div>

          <div className="fe-body">
              <header className="fe-header">
                  <button className="pull-right float btn-danger" onClick={this.logout.bind(this)}>Logout</button>
                  <h2 className="fe-h2">Euismod Venenatis</h2>
                  <p>34 Folders &nbsp;|&nbsp; 23567 Files</p>
              </header>

              <div className="feb-container">
                  <header className="fesl-row" data-type="folder">
                      <div className="fesl-item" data-sort="name">Name <i className="fesli-sort zmdi zmdi-sort-asc"></i></div>
                      <div className="fesl-item" data-sort="type">Type <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i></div>
                      <div className="fesl-item" data-sort="size">Size <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i></div>
                      <div className="fesl-item" data-sort="last-modified"> <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i>Last Modified</div>
                  </header>
              </div>

              <div className="feb-container">
                <ObjectsList selectObject={this.selectObject.bind(this)} shareObject={this.shareObject.bind(this)}/>
              </div>

              <div className="dropup feb-actions">
                  <a href="" data-toggle="dropdown" className="feba-toggle"><i className="fa fa-plus"></i></a>

                  <div className="dropdown-menu">
                      <a href="" className="feba-btn feba-upload">
                          <i className="fa fa-cloud-upload"></i>

                          <div className="febab-tooltip"><span>Upload Files & Folders</span></div>
                      </a>
                      <a href="" className="feba-btn feba-bucket">
                          <i className="fa fa-hdd-o"></i>
                          <div className="febab-tooltip"><span>Create Bucket</span></div>
                      </a>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
