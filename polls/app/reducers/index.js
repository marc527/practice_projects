import users from './users'
import polls from './polls'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'

export default combineReducers({
  users,
  polls,
  authedUser,
  loadingBar: loadingBarReducer
})
