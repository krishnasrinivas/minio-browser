import React from 'react'
import { connect } from 'react-redux'
import humanize from 'humanize'

import logo from '../../img/logo.svg'
import auth from '../auth.js'

import * as actions from '../actions'

let BucketList = ({ buckets, currentBucket, selectBucket }) => {
  const list = buckets.map((bucket, i) => {
    const active = bucket === currentBucket ? 'active' : ''
    return <li className={active} key={i} onClick={(e) => selectBucket(e, bucket)}><a href="">{bucket}</a></li>
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

let ObjectsList = ({objects, currentPath, selectPrefix, shareObject }) => {
  const list = objects.map((object, i) => {
    let size = object.name.endsWith('/') ? '' : object.size
    size = humanize.filesize(size)
    return (
      <div key={i} className="fesl-row">
          <div className="fesl-item" data-type={object.type}><a href="" onClick={(e) => selectPrefix(e, `${currentPath}${object.name}`)}>{object.name}</a></div>
          <div className="fesl-item">{size}</div>
          <div className="fesl-item">{object.lastModified}</div>
      </div>
    )
  })
  return (
    <div>{list}</div>
  )
}
ObjectsList = connect(state => state)(ObjectsList)

let Path = ({currentBucket, currentPath, selectPrefix}) => {
  let dirPath = []
  let path = currentPath.split('/').map((dir, i) => {
    dirPath.push(dir)
    let dirPath_ = dirPath.join('/') + '/'
    return <li key={i}><a href="#" onClick={(e) => selectPrefix(e, dirPath_)}>{dir}</a></li>
  })
  return (
    <ul className="breadcrumb">
      <li><a href="#" onClick={(e) => selectPrefix(e, '')}>{currentBucket}</a></li>
      {path}
    </ul>
  )
}
Path = connect(state => state)(Path)

export default class Browse extends React.Component {
  componentDidMount() {
    const { web, dispatch } = this.props
    web.ListBuckets().then(buckets => buckets.map(bucket => bucket.name))
                      .then(buckets => dispatch(actions.setBuckets(buckets)))
  }
  selectBucket(e, bucket) {
    e.preventDefault()
    if (bucket == this.props.currentBucket) return
    this.props.dispatch(actions.selectBucket(bucket))
  }
  selectPrefix(e, prefix) {
    const { dispatch, currentPath, web, currentBucket } = this.props
    e.preventDefault()
    if (prefix.endsWith('/') || prefix === '') {
      dispatch(actions.selectPrefix(prefix))
    } else {
      web.GetObjectURL({bucketName: currentBucket, objectName: prefix})
        .then(res => window.location = res)
    }
  }
  selectPath(e, dirPath) {
    e.preventDefault()
    console.log(dirPath)
  }
  shareObject(e, object) {
    e.preventDefault()
    console.log('share', object)
  }
  logout(e) {
    const { web, history } = this.props
    e.preventDefault()
    web.Logout()
    history.pushState(null, '/')
  }
  render() {
    return (
      <div className="file-explorer">
          <div className="fe-sidebar">
              <div className="fes-header clearfix">
                  <img src={logo} alt=""/>
                  <h2 className="fe-h2">Minio Browser</h2>
              </div>

              <BucketList selectBucket={this.selectBucket.bind(this)} />

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
                <Path selectPrefix={this.selectPrefix.bind(this)} />
              </div>
              <div className="feb-container">
                  <header className="fesl-row" data-type="folder">
                      <div className="fesl-item" data-sort="name">Name <i className="fesli-sort zmdi zmdi-sort-asc"></i></div>
                      <div className="fesl-item" data-sort="size">Size <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i></div>
                      <div className="fesl-item" data-sort="last-modified"> <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i>Last Modified</div>
                  </header>
              </div>

              <div className="feb-container">
                <ObjectsList selectPrefix={this.selectPrefix.bind(this)} shareObject={this.shareObject.bind(this)}/>
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
