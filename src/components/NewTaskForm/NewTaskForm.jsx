import React from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onMinChange = (event) => {
    this.setState({
      minutes: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      seconds: event.target.value,
    })
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    const { label, minutes, seconds } = this.state
    const time = Number(minutes) * 60 + Number(seconds)
    event.preventDefault()
    if (label.trim() === '') {
      event.preventDefault()
      return
    }
    const { onItemAdded } = this.props
    onItemAdded(label, time)
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            value={minutes}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={seconds}
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    )
  }
}
