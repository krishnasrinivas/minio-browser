import * as actions from './actions'

// state : {
//   buckets:[]string,
//   objects:[]{name, type, size, lastModified},
//   currentBucket: string,
//   currentPrefix: string
// }

export default (state = {buckets:['a', 'b', 'c', 'd'], objects:[], currentBucket: ''}, action) => {
  var newState = Object.assign({}, state)
  switch(action.type) {
    case actions.SET_CURRENT_BUCKET:
      newState.currentBucket = action.currentBucket
      break
    case actions.SET_OBJECTS:
      newState.objects = action.objects
      break
  }
  return newState
}
