import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import '../index.css'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayMoreInfo: false,
    }
  }

  toggleInfo = (event) => {
    if (event.target.tagName === 'DIV') {
      this.setState({ displayMoreInfo: !this.state.displayMoreInfo })
    }
  }

  likeBlog = async () => {
    const blog = {
      id: this.props.blog.id,
      title: this.props.blog.title,
      author: this.props.blog.author,
      url: this.props.blog.url,
      likes: this.props.blog.likes + 1,
      user: this.props.blog.user._id
    }

    const updatedBlog = await blogService.update(blog)
    this.props.updateBlogs(updatedBlog)
  }

  removeBlog = async () => {
    const message = `Do you want to delete '${this.props.blog.title}' by ${this.props.blog.author}?`
    if (this.props.user.id === this.props.blog.user._id || this.props.blog.user === null) {
      if (window.confirm(message)) {
        try {
          await blogService.remove(this.props.blog.id.toString())
          this.props.removeFromBlogs(this.props.blog)
        } catch (exeption) {
          console.log(exeption)
        }
      }
    } else {
      window.alert('You don\'t have permission to remove this blog')
    }
  }

  render() {

    const blogStyle = {
      paddingTop: 6,
      paddingLeft: 2,
      paddingBottom: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showOnlyToCorrectUser = {
      display: (this.props.blog.user._id === this.props.user.id || this.props.blog.user === null) ? '' : 'none'
    }

    if (this.state.displayMoreInfo) {
      return (
        <div onClick={this.toggleInfo} style={blogStyle} className='fullInfo'>
          <div>{this.props.blog.title} by {this.props.blog.author}</div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>
            {this.props.blog.likes} likes
            <button onClick={this.likeBlog}>like</button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
          <button style={showOnlyToCorrectUser} className='blueButton' onClick={this.removeBlog}>delete</button>
        </div>
      )
    }

    return (
      <div onClick={this.toggleInfo} style={blogStyle} className='defaultInfo'>
        {this.props.blog.title} {this.props.blog.author}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  removeFromBlogs: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  notify
}

export default connect(
  null,
  mapDispatchToProps
)(Blog)