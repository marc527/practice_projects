import React, { Component } from 'react'

class Grid extends Component {
  
  constructor(props) {
    super(props)
    
    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }
    
    this.state = {
      repos
    }
  }
  
  componentDidMount () {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  
  fetchRepos = (lang) => {
      this.props.fetchInitialData(lang)
        .then((repos) => this.setState(() => ({repos})))
  }
  
  componentDidUpdate (nextProps, nextState) {
    const { id } = this.props.match.params
    const newId = nextProps.match.params.id
    
    if (id !== newId) {
      this.setState(() => ({repos: null}))
      this.fetchRepos(this.props.match.params.id)
    }
  }
  
  render() {
    const { repos } = this.state

    return (<div>
      { this.state.repos ? <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{margin: 30}}>
            <ul>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul> : 'Loading...'}</div>
    )
  }
}
export default Grid
