import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleCompleted, changeInput }) {
  const element = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        changeInput={() => changeInput(id)}
      />
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
