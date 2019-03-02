const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')
const Loading = require('./Loading')

var SelectLanguage = ({languages, onSelect, selectedLanguage}) => {
  return (
    <ul className="languages">
      {languages.map((lang) => {
        return (
          <li
            key={lang}
            onClick={() => onSelect(lang)}
            className={lang === selectedLanguage ? 'selected' : ''}>{lang}</li>
        )
      })}
    </ul>
  )
}

var RepoGrid = ({repos}) => {
  return (repos && repos.length > 0) ? (
    <ul className="popular-list">
      {
          repos.map((repo, index) => {
            return (
              <li key={repo.id} className="popular-item">
                <div className="popular-rank">{index+1}</div>
                <ul className="space-list-items">
                  <li><img
                    className="space-list-avatar"
                    src={repo.owner.avatar_url} /></li>
                </ul>
              </li>
            )
          })
      }
    </ul>
  ) : <Loading text="Waiting" speed={1000} />
}

class Popular extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {

    this.setState(() => ({
        selectedLanguage: lang,
        repos: null
      }))

    api.fetchPopularRepos(lang)
      .then((repos) => this.setState(() => ({repos})))
  }

  render() {

    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
      <div>
      <SelectLanguage languages={languages}
        onSelect={(lang) => this.updateLanguage(lang)}
        selectedLanguage={this.state.selectedLanguage} />
      <RepoGrid repos={this.state.repos} />
      </div>
    )
  }
}

SelectLanguage.propTypes = {
  languages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired
}

module.exports = Popular
