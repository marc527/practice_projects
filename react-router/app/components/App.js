import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import Nav from './Nav'
import Loadable from 'react-loadable';

class DynamicLoading extends React.Component {

  state = {
    component: null
  }

  componentDidMount () {
    this.props.load()
      .then((mod) => this.setState(() => ({ component: mod.default })))
  }

  render () {
    return this.props.children(this.state.component)
  }
}


const Team = Loadable({
  loader: () => import('./Team'),
  loading() {
    return <div>Loading...</div>
  }
});

const Home = (props) => {
  return <DynamicLoading load={() => import('./Home')}>
    {
      (Component) => (Component ? <Component {...props} /> : 'Loading...' )
    }
  </DynamicLoading>
}

const Players = (props) => {
  return <DynamicLoading load={() => import('./Players')}>
    {
      (Component) => (Component ? <Component {...props} /> : 'Loading...' )
    }
  </DynamicLoading>
}

const TeamProfile = (props) => {
  return <DynamicLoading load={() => import('./TeamProfile')}>
    {
      (Component) => (Component ? <Component {...props} /> : 'Loading...' )
    }
  </DynamicLoading>
}

const Article = (props) => {
  return <DynamicLoading load={() => import('./Article')}>
    {
      (Component) => (Component ? <Component {...props} /> : 'Loading...' )
    }
  </DynamicLoading>
}

const fakeAuth = {
  isAuthenticated: false,
  signIn: (cb) => {
    fakeAuth.isAuthenticated = true;
    setTimeout(() => {
      cb()
    }, 3000)
  },
  signOut: (cb) => {
    fakeAuth.isAuthenticated = false;
    setTimeout(() => {
      cb()
    }, 3000)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => fakeAuth.isAuthenticated
    ? <Component {...props} /> : <Redirect to={{
      pathname: '/login',
      state: {
        from: props.location
      }
    }} />} />
}

class Login extends React.Component {

  state = {
    isAuthenticated: false
  }

  handleLogin = (e) => {
    e.preventDefault()

    fakeAuth.signIn(() => {
      if (fakeAuth.isAuthenticated) {
        return this.setState(() => ({
          isAuthenticated: true
        }))
      }
    })
  }

  render () {

    if (this.state.isAuthenticated) {
      return <Redirect to={this.props.location.state.from} />
    }

    return (
      <div>
        <h1>Login Page</h1>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }

}

const AuthButton = withRouter(({ location, history }) => {
  return (
    fakeAuth.isAuthenticated ? <button onClick={() => {
      fakeAuth.signOut(() => {

        return history.push('/login', {
          from: location
        })
      })
    }}>Sign out</button> : <Link to={{
      pathname: '/login',
      state: {
        from: location
      }
    }}>Sign in</Link>
  )
})

class App extends React.Component {
  render () {

    return (
      <Router>
        <div>
          <AuthButton />
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute path='/team' component={Team} />
            <Route path='/players' component={Players} />
            <Route exact path='/:teamId' component={TeamProfile} />
            <Route path='/:teamId/articles' component={Article} />
            <Route render={()=><h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App
