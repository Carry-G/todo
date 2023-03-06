import React from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

export default class Task extends React.Component {
  static defaultProps = {
    time: 0,
    date: new Date(),
    completed: false,
    check: false,
    onDeleted: () => {},
    onToggleCompleted: () => {},
    stopTimer: () => {},
    startTimer: () => {},
  }

  static propTypes = {
    time: PropTypes.number,
    date: PropTypes.instanceOf(Object),
    completed: PropTypes.bool,
    check: PropTypes.bool,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    stopTimer: PropTypes.func,
    startTimer: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { label: props.label }
  }

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
    const { time, completed, date, check, onDeleted, onToggleCompleted, changeInput, editing, stopTimer, startTimer } =
      this.props
    const { label } = this.state
    const min = Math.floor(time / 60)
    const sec = time - min * 60
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
            <span className="title" onClick={onToggleCompleted} aria-hidden="true">
              {label}
            </span>
            <span className="description">
              {`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}
              <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} />
              <button type="button" className="icon icon-pause" aria-label="pause" onClick={stopTimer} />
            </span>
            <span className="description">{`created ${result} ago`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={completed ? null : changeInput} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input type="text" onChange={this.onLabelChange} value={label} className="edit" onKeyDown={this.onClickEnter} />
      </li>
    )
  }
}
