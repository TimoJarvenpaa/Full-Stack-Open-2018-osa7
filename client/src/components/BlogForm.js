import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ''
    const author = event.target.author.value
    event.target.author.value = ''
    const url = event.target.url.value
    event.target.url.value = ''
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    this.props.createBlog(blogObject)
  }

  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            title:
          <input
              type="text"
              name="title"
            />
          </div>
          <div>
            author:
          <input
              type="text"
              name="author"
            />
          </div>
          <div>
            url:
          <input
              type="text"
              name="url"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createBlog
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)