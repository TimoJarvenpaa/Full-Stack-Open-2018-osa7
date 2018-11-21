import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserList extends React.Component {

  render() {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Blogs added</th>
            </tr>
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)