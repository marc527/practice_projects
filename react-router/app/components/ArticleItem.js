import React from 'react'
import { getArticle } from '../api'
import Sidebar from './Sidebar'
import { Route } from 'react-router-dom'

class ArticleItem extends React.Component {

  state = {
    article: null
  }

  componentDidMount () {
    const { teamId, articleId } = this.props.match.params
    this.fetchArticle(teamId, articleId)
  }

  fetchArticle = (teamId, articleId) => {
    getArticle(teamId, articleId)
      .then((article) => {
        return this.setState({
            article
        })
      })
  }

  componentWillReceiveProps (nextProps) {
    const nextArticleId = nextProps.match.params.articleId
    const { articleId, teamId } = this.props.match.params

    if (nextArticleId !== articleId) {
      this.fetchArticle(teamId, nextArticleId)
    }
  }

  render () {

    const { article } = this.state
    const { match, children } = this.props

    return article ? children(article) : 'Loading...'
  }
}

export default ArticleItem
