import React from 'react'
import { getTeamNames } from '../api'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  state = {
    teamNames: []
  }

  componentDidMount () {
    getTeamNames()
      .then((teamNames) => this.setState({teamNames}))
  }

  render () {

    let { teamNames } = this.state

    return (
      <ul>{
        teamNames.map((id) => <li key={id}><Link to={`/${id}`}>{id}</Link></li>)
      }</ul>
    )
  }
}

export default Home
