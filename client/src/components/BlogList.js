import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

class BlogList extends React.Component {

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        {this.props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)