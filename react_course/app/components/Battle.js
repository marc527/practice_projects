var React = require('react')
var Link = require('react-router-dom').Link
var PropTypes = require('prop-types')
var PlayerInput = require('./PlayerInput')
var PlayerPreview = require('./PlayerPreview')

class Battle extends React.Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      player1Name: '',
      player2Name: '',
      player1Image: null,
      player2Image: null
    }
  }
  
  handleSubmit (id, username) {
    this.setState(() => ({
        [`${id}Name`]: username,
        [`${id}Image`]: `https://github.com/${username}.png?size=200`
      })
    )
  }
  
  handleReset(id) {
    this.setState(() => ({
        [`${id}Name`]: '',
        [`${id}Image`]: null
      })
    )
  }
  
  render() {
    
    const { player1Name, player2Name, player1Image, player2Image } = this.state;

    return (
      <div>
        <div>
          {!player1Name 
            ? <PlayerInput id='player1' label='Player One' onSubmit={(id, username) => this.handleSubmit(id, username)} />
            : <PlayerPreview
              avatar={player1Image} 
              username={player1Name}>
              <button onClick={() => this.handleReset('player1')}>Reset</button>
            </PlayerPreview>}
          {!player2Name ? <PlayerInput id='player2' label='Player Two' onSubmit={(id, username) => this.handleSubmit(id, username)}/>
            : <PlayerPreview
              avatar={player2Image} 
              username={player2Name}>
                <button onClick={() => this.handleReset('player2')}>Reset</button>
              </PlayerPreview>
            }
        </div>
        
        {player1Image && player2Image && <Link to={
          {
            pathname: `${this.props.match.url}/result`,
            search: `?player1Name=${player1Name}&player2Name=${player2Name}`
          }
        }>Battle</Link>}
      </div>
    )
  }
}

export default Battle
