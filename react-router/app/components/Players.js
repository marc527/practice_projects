import React from 'react'
import { getPlayers } from '../api'
import slug from 'slug'
import queryString from 'query-string'
import Sidebar from './Sidebar'
import { Route, Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Players extends React.Component {

  state = {
    players: []
  }

  componentDidMount () {
      const { location } = this.props
      const { teamId } = location.search ? queryString.parse(location.search) : {}

      getPlayers(teamId)
        .then((players) => this.setState({players}))
  }

  getSelectedPlayer = (playerSlug) => {
    return this.state.players.find((player) => slug(player.name) === playerSlug)
  }

  render () {

    const { players } = this.state
    const { match, location } = this.props

    return (
      <div>
        <div>
          <Sidebar list={players.map((player) => player.name)} {...this.props} />
        </div>

        <div>
        <TransitionGroup exit={false}>
          <CSSTransition key={location.key} timeout={2000} classNames="fade">
            <Route path={`${match.url}/:playerSlug`} render={(props) => {
              const { playerSlug } = props.match.params
              const player = this.getSelectedPlayer(playerSlug)
              return <Player {...props} player={player} />
            }} />
          </CSSTransition>
        </TransitionGroup>
        </div>
      </div>
    )
  }
}


const Player = ({ match, location, player }) => {
  return (
    player ? <div>
      <img src={player.avatar} style={{ width: '40px' }} />
      <div><Link to={`/${player.teamId}`}>{ player.teamId }</Link></div>
    </div> : 'loading'
  )
}

export default Players
