import React from 'react'
import { connect } from 'react-redux'
import humanize from 'humanize'
import Moment from 'moment'

import logo from '../../img/logo.svg'
import auth from '../auth.js'

import * as actions from '../actions'

let BucketList = ({ visibleBuckets, currentBucket, selectBucket, searchBuckets }) => {
  // console.log(visibleBuckets)
  const list = visibleBuckets.map((bucket, i) => {
    const active = bucket === currentBucket ? 'active' : ''
    return <li className={active} key={i} onClick={(e) => selectBucket(e, bucket)}><a href="">{bucket}</a></li>
  })
  return (
    <div>
      <div className="fesb-search">
          <input type="text" onChange={searchBuckets} placeholder="Search Buckets..."/>
          <i></i>
      </div>
      <ul>
          {list}
      </ul>
    </div>
  )
}
BucketList = connect(state => state)(BucketList)

let ObjectsList = ({objects, currentPath, selectPrefix, shareObject, dataType }) => {
  const list = objects.map((object, i) => {
    let size = object.name.endsWith('/') ? '' : humanize.filesize(object.size)
    let lastModified = object.name.endsWith('/') ? '' : Moment(object.lastModified).format('lll')
    return (
      <div key={i} className="fesl-row">
          <div className="fesl-item" data-type={dataType(object.name)}><a href="" onClick={(e) => selectPrefix(e, `${currentPath}${object.name}`)}>{object.name}</a></div>
          <div className="fesl-item">{size}</div>
          <div className="fesl-item">{lastModified}</div>
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
    return <span key={i}><a href="" onClick={(e) => selectPrefix(e, dirPath_)}>{dir}</a></span>
  })
  return (
    <h2 className="fe-h2">
      <span className="main"><a onClick={(e) => selectPrefix(e, '')} href="">{currentBucket}</a></span>
      {path}
    </h2>
  )
}
Path = connect(state => state)(Path)

export default class Browse extends React.Component {
  componentDidMount() {
    const { web, dispatch } = this.props
    $('.fe-scroll-list').mCustomScrollbar({
        theme: 'minimal-dark',
        scrollInertia: 100,
        axis:'y',
        mouseWheel: {
            enable: true,
            axis: 'y',
            preventDefault: true
        }
    });
    web.ListBuckets().then(buckets => buckets.map(bucket => bucket.name))
                      .then(buckets => {
                        dispatch(actions.setBuckets(buckets))
                        dispatch(actions.setVisibleBuckets(buckets))
                      })

  }
  selectBucket(e, bucket) {
    e.preventDefault()
    if (bucket == this.props.currentBucket) return
    this.props.dispatch(actions.selectBucket(bucket))
  }
  searchBuckets(e) {
    e.preventDefault()
    let { buckets } = this.props
    this.props.dispatch(actions.setVisibleBuckets(buckets.filter(bucket => bucket.indexOf(e.target.value) > -1)))
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
  dataType(name) {
    if (name.endsWith('/')) return 'folder'
    return 'other'
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
              <div className="fes-list fe-scroll-list">
                <BucketList searchBuckets={this.searchBuckets.bind(this)} selectBucket={this.selectBucket.bind(this)} />
              </div>
              <div className="fes-host">
                  <i className="fa fa-globe"></i> {window.location.hostname}
              </div>
          </div>

          <div className="fe-body">
              <header className="fe-header">
                  <Path selectPrefix={this.selectPrefix.bind(this)} />
                  <ul className="feh-actions">
                      <li>
                          <a href="" onClick={this.logout.bind(this)}>
                              <i className="fa fa-power-off"></i>
                          </a>
                      </li>
                  </ul>
              </header>
              <div className="feb-container">
                  <header className="fesl-row" data-type="folder">
                      <div className="fesl-item" data-sort="name">Name <i className="fesli-sort zmdi zmdi-sort-asc"></i></div>
                      <div className="fesl-item" data-sort="size">Size <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i></div>
                      <div className="fesl-item" data-sort="last-modified"> <i className="fesli-sort zmdi zmdi-sort-amount-asc"></i>Last Modified</div>
                  </header>
              </div>

              <div className="feb-container">
                <ObjectsList dataType={this.dataType.bind(this)} selectPrefix={this.selectPrefix.bind(this)} shareObject={this.shareObject.bind(this)}/>
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
