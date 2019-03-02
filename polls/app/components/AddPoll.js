import React from 'react'
import { connect } from 'react-redux'
import { handleSavePoll } from '../actions/polls'
import { Redirect } from 'react-router'

class AddPoll extends React.Component {

  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(handleSavePoll(this.state))
      .then(() => this.props.history.push('/'))
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      ...this.state,
      [name]: value
    })

  }

  handleDisableBtn = () => {
    const { question, a, b, c, d } = this.state

    if (question==='' || a==='' || b==='' || c==='' || d==='') {
      return true;
    }

    return false;
  }

  render () {

    const { question, a, b, c, d } = this.state

    return (
      <div>
        <h1>Add Poll</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>What is your question?</p>
            <input style={styles.input} type="text" name="question" value={question} onChange={this.handleChange} />
          </div>

          <div>
            <p>What are the opinions?</p>
            <p>A.</p>
            <input style={styles.input} type="text" name="a" value={a} onChange={this.handleChange} />
            <p>B.</p>
            <input style={styles.input} type="text" name="b" value={b} onChange={this.handleChange} />
            <p>C.</p>
            <input style={styles.input} type="text" name="c" value={c} onChange={this.handleChange} />
            <p>D.</p>
            <input style={styles.input} type="text" name="d" value={d} onChange={this.handleChange} />
          </div>

          <button disabled={this.handleDisableBtn()}>Submit</button>
        </form>

      </div>
    )
  }
}

const styles = {
  input: {
    border: '1px solid black'
  }
}

export default connect(({authedUser}) => ({authedUser}))(AddPoll)
