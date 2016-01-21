export const SET_CURRENT_BUCKET = 'SET_CURRENT_BUCKET'
export const SET_OBJECTS = 'SET_OBJECTS'
// export const SHARE_OBJECT = 'SHARE_OBJECT'

let objects = [{name: 'aaaa', type: 'folder', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'bbbb', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'cccc', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'dddd', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'eeee', type: 'text', size: '20 MB', lastModified: '28-03-2009'},
               {name: 'ffff', type: 'text', size: '20 MB', lastModified: '28-03-2009'}]

export const setCurrentBucket = (currentBucket) => {
  return dispatch => {
    dispatch({type: SET_CURRENT_BUCKET, currentBucket})
    dispatch({type: SET_OBJECTS, objects: objects.map(object => {
      return Object.assign({}, object, {name: `${currentBucket}-${object.name}`})
    })})
  }
}

// export const selectObject = (objectBaseName) => {
//   return {type: SELECT_OBJECT, objectBaseName}
// }
//
// export const shareObject = (objectBaseName) => {
//   return {type: SHARE_OBJECT, objectBaseName}
// }
