var axios = require('axios')

const getProfile = (username) => {
  return axios.get(`https://api.github.com/users/${username}`)
    .then (({data}) => data)
}

const getRepos = (username) => {
  return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
}

const getStarCount = (repos) => {
  return repos.data.reduce((count, {stargazers_count}) => (count + stargazers_count), 0)
}

const calculateScore = ({followers}, repos) => ((followers * 3) + getStarCount(repos));

const handleError = (error) => (console.warn(error) || null)

const getUserData = (player) => {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile, repos)}
  ))
}

const sortPlayers = (players) => {
  return players.sort((a, b) => (b.score - a.score))
}

module.exports = {
  fetchPopularRepos: (language) => {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=starts&order=desc&type=Repositories`)

    return axios.get(encodedURI)
      .then((response) => response.data.items);
  },
  battle: (players) => {
    return axios.all(players.map((player) => getUserData(player)))
    .then((players) => sortPlayers(players))
    .catch((err) => handleError(err))
  }
}
