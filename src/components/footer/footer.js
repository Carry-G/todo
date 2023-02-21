// import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './footer.css'

function Footer({ itemsCount, filterBtn, clearCompleted, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsCount} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filterBtn={filterBtn} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  itemsCount: 0,
  filterBtn: 'all',
  clearCompleted: () => {},
  onFilterChange: () => {},
}
Footer.propTypes = {
  itemsCount: PropTypes.number,
  filterBtn: PropTypes.string,
  clearCompleted: PropTypes.func,
  onFilterChange: PropTypes.func,
}
export default Footer
