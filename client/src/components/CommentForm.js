import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

class CommentForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    //const generateId = () => Number((Math.random() * 1000000).toFixed(0))
    const comment = {
      comment: content
    }
    this.props.addComment(this.props.blog.id, comment)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              name="comment"
            />
          </Form.Field>
          <Button type="submit">add comment</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  addComment
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm)