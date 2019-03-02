import React from 'react'
import TeamItem from './TeamItem'
import { Link, Route } from 'react-router-dom'
import { getTeamsArticles, getTeamNames } from '../api'
import slug from 'slug'

class TeamProfile extends React.Component {

  state = {
    articles: [],
    teamNames: [],
    loading: true
  }

  componentDidMount () {

    const { teamId } = this.props.match.params

    Promise.all([
      getTeamsArticles(teamId),
      getTeamNames()
    ]).then(([ teamArticles, teamNames ]) => {

      if (!teamNames.includes(teamId)) {
        return this.props.history.push('/')
      }

      return this.setState({
        articles: teamArticles,
        teamNames,
        loading: false
      })
    })

  }

  render () {

    const { teamId } = this.props.match.params
    const { articles } = this.state
    const { match } = this.props

    return (
      <div>
        {this.state.loading ? 'Loading...' : <TeamItem teamId={teamId}>
          {(team) => (
            <div>
              <h3>Coach: {team.coach}</h3>
            </div>
          )}
        </TeamItem> }

        <div>
          {articles.map((article) => (<div key={article.id}>
            <h2><Link to={`${match.url}/articles/${article.id}`}>{article.title}</Link></h2>
          </div>))}
        </div>
      </div>
    )
  }
}

export default TeamProfile
