import React from 'react'
import { getTeam } from '../api'

class TeamItem extends React.Component {

  state = {
    team: null
  }

  componentDidMount () {
    this.fetchTeam()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.teamId !== this.props.teamId) {
      this.fetchTeam()
    }
  }

  fetchTeam = () => {
    getTeam(this.props.teamId).then((team) => this.setState({team}))
  }

  render () {

    const { team } = this.state

    return team ? this.props.children(team) : <div>Loading</div>
  }
}

export default TeamItem
