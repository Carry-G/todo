import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer({ itemsCount, filterButtons, clearCompleted, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filterBtn={filterButtons} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  itemsCount: 0,
  filterButtons: 'all',
  clearCompleted: () => {},
  onFilterChange: () => {},
}
Footer.propTypes = {
  itemsCount: PropTypes.number,
  filterButtons: PropTypes.string,
  clearCompleted: PropTypes.func,
  onFilterChange: PropTypes.func,
}
export default Footer
