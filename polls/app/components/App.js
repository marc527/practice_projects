import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { receiveInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Poll from './Poll'

class App extends React.Component {
  
  componentDidMount () {
    let { dispatch } = this.props
    dispatch(receiveInitialData())
  }
  
  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
                  
          {this.props.isLoading ? null : 
            <Fragment>
              <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/leaderboard" activeClassName="active">Leaderboard</NavLink></li>
                <li><NavLink to="/add" activeClassName="active">Add Poll</NavLink></li>
              </ul>
              
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/add" component={AddPoll} />
              <Route path="/polls/:id" component={Poll} />
           </Fragment>
          }
        </Fragment>
      </Router>
    )
  }
}

export default connect((state) => ({
  isLoading: state.authedUser ? false : true 
}))(App)
