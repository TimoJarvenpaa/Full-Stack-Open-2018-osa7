import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

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
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>title:</label>
            <input
              type="text"
              name="title"
            />
          </Form.Field>
          <Form.Field>
            <label>author:</label>
            <input
              type="text"
              name="author"
            />
          </Form.Field>
          <Form.Field>
            <label>url:</label>
            <input
              type="text"
              name="url"
            />
          </Form.Field>
          <Button type="submit">create</Button>
        </Form>
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