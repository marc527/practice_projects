import React from 'react'
import { getTeamNames } from '../api'
import Sidebar from './Sidebar'
import TeamItem from './TeamItem'
import { Route, Link } from 'react-router-dom'

class Team extends React.Component {

  state = {
    teamNames: []
  }

  componentDidMount () {
    getTeamNames()
      .then((teamNames) => this.setState({teamNames}))
  }

  render () {

    const { teamNames } = this.state
    const { match } = this.props

    return (
      <div>
        <div>
          <Sidebar {...this.props} list={teamNames} />
        </div>

        <div>
          <Route path={`${match.url}/:teamId`} render={({ match }) => (<TeamItem teamId={match.params.teamId}>
            {(team) => (
              <div>
                <h3>Coach: {team.coach}</h3>
                <Link to={`/${team.id}`}>Team Page</Link>
              </div>
            )}
          </TeamItem>)} />
        </div>
      </div>
    )
  }
}

export default Team
