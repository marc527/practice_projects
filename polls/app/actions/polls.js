import { savePoll } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls
  }
}

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll
  }
}

export function handleSavePoll (poll) {
  return (dispatch, getState) => {

    let { authedUser } = getState()
    dispatch(showLoading())
    return savePoll({
      ...poll,
      author: authedUser
    })
    .then((fp) => dispatch(addPoll(fp)))
    .then(() => dispatch(hideLoading()))
  }
}
