import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    if (this.props.notifications === null) {
      return null
    }
    return (
      <div className='notification'>
        {this.props.notifications}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)