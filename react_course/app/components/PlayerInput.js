var React = require('react')

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  handleChange (e) {
    var value = e.target.value
    this.setState(() => {
      return {
        username: value
      }
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return (
      <form className='column' onSubmit={(e) => this.handleSubmit(e)}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={(e) => this.handleChange(e)}
          />
          <button className='button' type='submit' disabled={!this.state.username}>
            submit
          </button>
      </form>
    )
  }
}

module.exports = PlayerInput
