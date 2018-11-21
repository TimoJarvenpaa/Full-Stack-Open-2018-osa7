import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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

  removeBlog = async (blog) => {
    const message = `Do you want to delete '${blog.title}' by ${blog.author}?`
    if (this.props.user.id === blog.user._id || blog.user === null) {
      if (window.confirm(message)) {
        this.props.removeBlog(blog.id)
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
      marginBottom: 5,
      borderRadius: 5,
      backgroundColor: '#ffffcc'
    }

    if (this.state.displayMoreInfo) {

      return (
        <div onClick={this.toggleInfo} style={blogStyle} className='fullInfo'>
          <div>{this.props.blog.title} by {this.props.blog.author}</div>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>
            has {this.props.blog.likes}
            <button onClick={() => this.props.likeBlog(this.props.blog)}>like</button>
          </div>
          <div>added by {this.props.blog.user.name}</div>
          <button style={{ display: (this.props.blog.user._id === this.props.user.id || this.props.blog.user === null) ? '' : 'none' }}
            className='blueButton' onClick={() => this.removeBlog(this.props.blog)}>delete</button>
        </div>
      )
    }

    return (
      <div onClick={this.toggleInfo} style={blogStyle} className='defaultInfo'>
        <div><Link to={`/blogs/${this.props.blog.id}`}>{this.props.blog.title} by {this.props.blog.author}</Link></div>
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
)(Blog)