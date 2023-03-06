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
    min: '',
    sec: '',
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { label, min, sec } = this.state
    const time = Number(min) * 60 + Number(sec)
    e.preventDefault()
    if (label.trim() === '') {
      e.preventDefault()
      return
    }
    const { onItemAdded } = this.props
    onItemAdded(label, time)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
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
            value={min}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={sec}
          />
          <input type="submit" style={{ display: 'none' }} />
        </form>
      </header>
    )
  }
}
