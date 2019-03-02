import React from 'react'
import { Link, Route } from 'react-router-dom'
import slug from 'slug'

export default function Sidebar ({ list, location, match }) {
  return (
    list ? <ul className="side-bar">
      {list.map((item) => <CustomLink
        to={{
            pathname: `${match.url}/${slug(item)}`,
            search: location.search
          }}
        key={item}>{item}</CustomLink>)}
    </ul> : 'loading...'
  )
}

const CustomLink = ({ to, children }) => {
  return (
    <Route path={to.pathname} children={({ match }) => {
      return <li style={{ fontWeight: match ? 'bold' : 'normal' }}><Link to={to.pathname}>{children}</Link></li>
    }} />
  )
}
