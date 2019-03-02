import { savePollAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer ({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  }
}

export function handleAddAnswer (answer) {
  return (dispatch) => {
    dispatch(showLoading())
    savePollAnswer(answer)
      .then(() => dispatch(addAnswer(answer)))
      .then(() => dispatch(hideLoading()))
  }
}
