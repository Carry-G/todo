// import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

function TaskList({ todos, onDeleted, onToggleCompleted }) {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task key={id} {...itemProps} onDeleted={() => onDeleted(id)} onToggleCompleted={() => onToggleCompleted(id)} />
    )
  })

  return <ul className="todo-list">{element}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
}
export default TaskList
