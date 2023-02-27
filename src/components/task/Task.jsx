import React from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

export default class Task extends React.Component {
  static defaultProps = {
    date: new Date(),
    completed: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    check: false,
  }

  static propTypes = {
    date: PropTypes.instanceOf(Object),
    completed: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    check: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = { label: props.label }
  }

  // state = {
  //   label: this.props.label,
  // }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onClickEnter = (e) => {
    const { changeInput } = this.props
    if (e.keyCode === 13) {
      changeInput()
    }
  }

  render() {
    const { completed, check, date, onDeleted, onToggleCompleted, changeInput, editing } = this.props
    const { label } = this.state
    const timeCreat = new Date()
    const result = formatDistance(date, timeCreat, { includeSeconds: true })
    let classNamesTask
    if (completed) {
      classNamesTask = ' completed'
    }
    if (editing) {
      classNamesTask = ' editing'
    }
    return (
      <li className={classNamesTask}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={check} onChange={onToggleCompleted} />
          <label>
            <span className="description" onClick={onToggleCompleted} aria-hidden="true">
              {label}
            </span>
            <span className="created">{`created ${result} ago`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={completed ? null : changeInput} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input type="text" onChange={this.onLabelChange} value={label} className="edit" onKeyDown={this.onClickEnter} />
      </li>
    )
  }
}
