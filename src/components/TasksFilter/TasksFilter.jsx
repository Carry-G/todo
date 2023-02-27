import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    filterBtn: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    filterBtn: PropTypes.string,
    onFilterChange: PropTypes.func,
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { onFilterChange, filterBtn } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filterBtn === name
      const className = isActive ? 'selected' : ''

      return (
        <li key={name}>
          <button type="button" className={className} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}
