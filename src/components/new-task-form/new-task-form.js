import React from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { label } = this.state
    const { onItemAdded } = this.props
    e.preventDefault()
    onItemAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    )
  }
}
