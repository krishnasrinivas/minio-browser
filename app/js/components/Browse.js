import React from 'react'

import logo from '../../img/logo.svg'
import auth from '../auth.js'

const BucketList = ({ buckets, selectBucket }) => {
  const list = buckets.map((bucket, i) => <li key={i} onClick={(e) => selectBucket(e, bucket)}><a href="">{bucket}</a></li>)
  return (
    <div className="fes-list">
        <ul>
            {list}
        </ul>
    </div>
  )
}

export default class Browse extends React.Component {
  constructor() {
    super()
    this.state = {
      buckets: ['aaaaa', 'bbbbb', 'cccc']
    }
  }
  selectBucket(e, bucket) {
    e.preventDefault()
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

              <BucketList buckets={this.state.buckets} selectBucket={this.selectBucket.bind(this)} />

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

              <div className="feb-container selectable">
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="folder">Auto Uploader</div>
                      <div className="fesl-item">Folder</div>
                      <div className="fesl-item">2.4 GB</div>
                      <div className="fesl-item">05-10-2015</div>

                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="folder">Backup 234718</div>
                      <div className="fesl-item">Folder</div>
                      <div className="fesl-item">1.2 GB</div>
                      <div className="fesl-item">11-02-2014</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="folder">Uploads</div>
                      <div className="fesl-item">Folder</div>
                      <div className="fesl-item">900MB</div>
                      <div className="fesl-item">01-01-2011</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="pdf">summerize_2.pdf</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">23MB</div>
                      <div className="fesl-item">10-10-2013</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="zip">Amet_Sollicitudin_Tellus.zip</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.78MB</div>
                      <div className="fesl-item">01-09-2010</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="audio">Vestibulum_Malesuada.wav</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.54MB</div>
                      <div className="fesl-item">22-08-2010</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="code">auth.py</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.002MB</div>
                      <div className="fesl-item">01-07-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="excel">Nibh_Ligula_Cursususce.xls</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">2MB</div>
                      <div className="fesl-item">31-06-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="image">sitpurus_tellus.jpeg</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.1MB</div>
                      <div className="fesl-item">09-04-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="movie">sentation_2002.mkv</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">1.4GB</div>
                      <div className="fesl-item">06-04-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="other">login_logs.xml</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.4MB</div>
                      <div className="fesl-item">29-03-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="presentation">Pharetra.ppt</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">10MB</div>
                      <div className="fesl-item">28-03-2009</div>
                  </div>
                  <div className="fesl-row">
                      <div className="fesl-item" data-type="audio">enean_psum_ibendum.mp3</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">5.3MB</div>
                      <div className="fesl-item">28-03-2009</div>
                  </div>

                  <div className="fesl-row">
                      <div className="fesl-item" data-type="text">mattistisus.txt</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.05MB</div>
                      <div className="fesl-item">12-01-2009</div>
                  </div>

                  <div className="fesl-row">
                      <div className="fesl-item" data-type="movie">dapibus_ondimentum.mp4</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">732MB</div>
                      <div className="fesl-item">18-09-2008</div>
                  </div>

                  <div className="fesl-row">
                      <div className="fesl-item" data-type="doc">bibendum.doc</div>
                      <div className="fesl-item">File</div>
                      <div className="fesl-item">0.01MB</div>
                      <div className="fesl-item">02-09-2008</div>
                  </div>
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
