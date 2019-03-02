import React from 'react'
import { getTeamsArticles } from '../api'
import Sidebar from './Sidebar'
import { Route } from 'react-router-dom'
import ArticleItem from './ArticleItem'

class Article extends React.Component {

  state = {
    articles: [],
    article: null,
    loading: true
  }

  componentDidMount () {

    const { teamId } = this.props.match.params

    getTeamsArticles(teamId)
      .then((articles) => {
        return this.setState({
            articles,
            loading: false
        })
      })

  }

  render () {

    const { articles, article, loading } = this.state
    const { match } = this.props

    return (
      <div>
        <Sidebar {...this.props} list={articles.map((article) => article.title)} />

        <div>
          <Route path={`${match.path}/:articleId`} render={({match}) => (
            <ArticleItem match={match}>
              {
                (article) => (
                  <div>{article.body}</div>
                )
              }
            </ArticleItem>
          )} />
        </div>
      </div>
    )
  }
}

export default Article
