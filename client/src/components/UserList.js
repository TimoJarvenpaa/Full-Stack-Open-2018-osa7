import React from 'react'
import { connect } from 'react-redux'

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
              <tr key={user.name}>
                <td>{user.name}</td>
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

// const mapDispatchToProps = {
//   likeBlog
// }

export default connect(
  mapStateToProps,
  null
)(UserList)