import web from './web'

export const SET_WEB = 'SET_WEB'
export const SET_CURRENT_BUCKET = 'SET_CURRENT_BUCKET'
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH'
export const SET_BUCKETS = 'SET_BUCKETS'
export const SET_OBJECTS = 'SET_OBJECTS'
// export const SHARE_OBJECT = 'SHARE_OBJECT'

let objects = [{name: 'aaaa', type: 'folder', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'bbbb', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'cccc', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'dddd', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'eeee', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'ffff', type: 'text', size: '20 MB', lastModified: '28-03-2009'}]

export const setWeb = web => {
  return {
    type: SET_WEB,
    web
  }
}

export const setBuckets = buckets => {
  return {
    type: SET_BUCKETS,
    buckets
  }
}

export const setObjects = objects => {
  return {
    type: SET_OBJECTS,
    objects
  }
}

export const setCurrentBucket = currentBucket => {
  return {
    type: SET_CURRENT_BUCKET,
    currentBucket
  }
}

export const setCurrentPath = currentPath => {
  return {
    type: SET_CURRENT_PATH,
    currentPath
  }
}

export const selectBucket = (currentBucket) => {
  return (dispatch, getState) => {
    let web = getState().web
    dispatch(setCurrentBucket(currentBucket))
    dispatch(setCurrentPath(''))
    web.ListObjects({bucketName: currentBucket})
      .then(objects => dispatch(setObjects(objects)))
  }
}

export const selectPrefix = prefix => {
  return (dispatch, getState) => {
    const { currentBucket, web } = getState()
    web.ListObjects({bucketName: currentBucket, prefix})
      .then(objects => objects.map(object => {object.name = object.name.replace(`${prefix}`, ''); return object}))
      .then(objects => dispatch(setObjects(objects)))
      .then(dispatch(setCurrentPath(prefix)))
  }
}
