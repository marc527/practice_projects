import { RECEIVE_USERS } from '../actions/users'
import { ADD_POLL } from '../actions/polls'
import { ADD_ANSWER } from '../actions/answers'

export default function users (state={}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_POLL:
      return {
          ...state,
          [action.poll.author]: author(state[action.poll.author], action)
      }
    case ADD_ANSWER:
      const { authedUser, id } = action
      return {
        ...state,
        [authedUser]: state[authedUser].answers.concat(id)
      }
    default:
      return state
  }
}

function author (state = {}, action) {
  switch (action.type) {
    case ADD_POLL:
      return {
          ...state,
          polls: state.polls.concat(action.poll.id)
      }
    default:
      return state
  }
}
