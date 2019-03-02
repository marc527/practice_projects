var React = require('react')
var Link = require('react-router-dom').Link

class Home extends React.Component {
  render() {

    return (
      <div>
        Home Page
        <Link className="button" to="/battle">Battle</Link>
      </div>
    )

  }
}

module.exports = Home
