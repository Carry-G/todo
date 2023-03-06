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
    this.textInput = React.createRef()
  }

  // componentDidMount() {
  //   this.textInput.current.focus()
  // }
  componentDidUpdate() {
    const { editing } = this.props
    if (editing) {
      this.textInput.current.focus()
    }
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onClickEnter = (event) => {
    const { changeInput } = this.props
    if (event.keyCode === 13) {
      changeInput()
    }
  }

  render() {
    const { time, completed, date, check, onDeleted, onToggleCompleted, changeInput, editing, stopTimer, startTimer } =
      this.props
    const { label } = this.state
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
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
              {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
              <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} />
              <button type="button" className="icon icon-pause" aria-label="pause" onClick={stopTimer} />
            </span>
            <span className="description">{`created ${result} ago`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={completed ? null : changeInput} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          onChange={this.onLabelChange}
          value={label}
          className="edit"
          onKeyDown={this.onClickEnter}
          ref={this.textInput}
        />
      </li>
    )
  }
}
