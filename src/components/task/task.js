// import React from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

function Task({ label, completed, check, date, onDeleted, onToggleCompleted }) {
  const timeCreat = new Date()
  const result = formatDistance(date, timeCreat, { includeSeconds: true })

  let classNamesTask
  if (completed) {
    classNamesTask = 'completed'
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
        <button type="button" aria-label="edit" className="icon icon-edit" />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  )
}

Task.defaultProps = {
  date: new Date(),
  completed: false,
  onDeleted: () => {},
  onToggleCompleted: () => {},
  check: false,
}

Task.propTypes = {
  date: PropTypes.instanceOf(Object),
  completed: PropTypes.bool,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  check: PropTypes.bool,
}

export default Task
