import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/team' style={styles.navLink}>Team</Link>
      <Link to='/players' style={styles.navLink}>Players</Link>
    </nav>
  )
}

const styles = {
  navLink: {
    marginLeft: '20px'
  }
}

export default Nav
