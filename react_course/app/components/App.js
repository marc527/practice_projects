import React from 'react'
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import Popular from './Popular'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Result from './Result'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/result' component={Result} />
            <Route path='/popular' component={Popular} />
            <Route render={() => (<div>Page not found</div>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
