import React from 'react'
import { connect } from 'react-redux'

class Leaderboard extends React.Component {
  render () {
    const { users } = this.props;
    
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          { Object.keys(users).map((id) => <User key={id} user={users[id]} />) }
        </ul>
      </div>
    )
  }
}

const User = ({user}) => {
  return (
    <li>
      <img src={user.avatarURL} />
      <h3>{user.name}</h3>
      <p>Polls: {user.polls ? user.polls.length : 0}</p>
      <p>Answers: {user.answers.length}</p>
    </li>
  )
}

function mapStateToProps ({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
