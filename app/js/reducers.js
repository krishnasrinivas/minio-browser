import * as actions from './actions'

// state : {
//   buckets:[]string,
//   objects:[]{name, type, size, lastModified},
//   currentBucket: string,
//   currentPath: string
// }

export default (state = {buckets:[], objects:[], currentBucket: '', currentPath: ''}, action) => {
  var newState = Object.assign({}, state)
  switch(action.type) {
    case actions.SET_WEB:
      newState.web = action.web
      break
    case actions.SET_BUCKETS:
      newState.buckets = action.buckets
      break
    case actions.SET_CURRENT_BUCKET:
      newState.currentBucket = action.currentBucket
      break
    case actions.SET_OBJECTS:
      newState.objects = action.objects
      break
    case actions.SET_CURRENT_PATH:
      newState.currentPath = action.currentPath
      break
  }
  return newState
}
