const React = require('react')

const PlayerPreview = ({avatar, username, children}) => {
  return (
    <div>
      <img className="avatar" src={avatar} />
      <h2>@{username}</h2>
      {children}
    </div>
  )
}

module.exports = PlayerPreview
