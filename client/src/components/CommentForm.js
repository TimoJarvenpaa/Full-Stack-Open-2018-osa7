import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

class CommentForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    this.props.addComment(this.props.blog.id, comment)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="comment"
            />
            <button type="submit">add comment</button>
          </div>
        </form>
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