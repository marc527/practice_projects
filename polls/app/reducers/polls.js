import { RECEIVE_POLLS, ADD_POLL } from '../actions/polls'
import { ADD_ANSWER } from '../actions/answers'

export default function polls (state={}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls
      }
    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll
      }
    case ADD_ANSWER:
      const { id, authedUser, answer } = action
      const poll = state[id]

      return {
        ...state,
        [id]: {
          ...poll,
          [answer + 'Votes']: poll[answer+'Votes'].concat(authedUser)
        }
      }
    default:
      return state
  }
}
