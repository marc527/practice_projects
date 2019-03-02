import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

class Dashboard extends React.Component {

  state = {
    showAnswered: false
  }

  handleShowAnswered = () => {
    if (!this.state.showAnswered) {
      this.setState({
        showAnswered: true
      })
    }
  }

  handleShowUnanswered = () => {
    if (this.state.showAnswered) {
      this.setState({
        showAnswered: false
      })
    }
  }

  render () {

    const { answered, unanswered, match } = this.props;
    const list = this.state.showAnswered ? answered : unanswered;

    return (
      <div>
        <div>
          <div
            onClick={this.handleShowUnanswered}
            style={this.state.showAnswered ? {} : {textDecoration: 'underline'}}>Unanswered</div>
          <span> | </span>
          <div
            onClick={this.handleShowAnswered}
            style={this.state.showAnswered ? {textDecoration: 'underline'} : {}}>Answered</div>
        </div>

        <div>
          <ul>
            {list.map((poll) => <li key={poll.id}><Link to={`/polls/${poll.id}`}>{poll.question}</Link></li>)}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users, polls, authedUser}) {
  const answers = users[authedUser].answers

  const answered = answers.map((id) => polls[id])
    .sort((a,b) => b.timestamp - a.timestamp)

  const unanswered = Object.keys(polls).filter((id) => !answers.includes(id))
                      .map((id) => polls[id])
                      .sort((a,b) => b.timestamp - a.timestamp)

  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)
