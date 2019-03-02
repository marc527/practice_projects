var React = require('react')
var api = require('../utils/api')
var queryString = require('query-string')
var PropTypes = require('prop-types')
var PlayerPreview = require('./PlayerPreview')

var Player = ({label, score, profile}) => {
  return (
    <div>
      <h1>{label}</h1>
      <h3>Score: {score}</h3>
      <PlayerPreview 
        avatar={profile.avatar_url}
        username={profile.login}>
        <p>{profile.name}</p>
      </PlayerPreview>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Result extends React.Component{
  
  constructor(props) {
    super(props)
    
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount () {
    const { player1Name, player2Name } = queryString.parse(this.props.location.search)
    
    api.battle([
      player1Name,
      player2Name
    ])
    .then((results) => {
      console.log(results)
      if(results === null) {
        return this.setState(() => {
          return {
            error: 'there is an error',
            loading: false
          }
        })
      }
      
      this.setState(() => ({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }))
    })
  }
  
  render() {
      
    const {error, winner, loser, loading} = this.state;
    
    if(loading === true) {
      return <p>Loading...</p>
    }
    
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      )
    }
    
    return (
      <div>
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    )
  }
}

module.exports = Result
