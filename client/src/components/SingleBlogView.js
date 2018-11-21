import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

class SingleBlogView extends React.Component {

  removeBlog = async (blog) => {
    const message = `Do you want to delete '${blog.title}' by ${blog.author}?`
    if (this.props.user.id === blog.user._id || blog.user === null) {
      if (window.confirm(message)) {
        this.props.removeBlog(blog.id)
        this.props.history.push('/')
      }
    } else {
      window.alert('You don\'t have permission to remove this blog')
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.blog.title} by {this.props.blog.author}</h2>
        <a href={this.props.blog.url}>{this.props.blog.url}</a>
        <div>
          {this.props.blog.likes} likes
          <button onClick={() => this.props.likeBlog(this.props.blog)}>like</button>
        </div>
        <div>added by {this.props.blog.user.name}</div>
        <button style={{ display: (this.props.blog.user._id === this.props.user.id || this.props.blog.user === null) ? '' : 'none' }}
          className='blueButton' onClick={() => this.removeBlog(this.props.blog)}>delete</button>
        <h3>comments</h3>
        <CommentForm blog={this.props.blog} />
        <ul>
          {this.props.blog.comments.map(comment =>
            <li key={comment}>{comment}</li>
          )}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlogView)