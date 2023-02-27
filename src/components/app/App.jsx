import React from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

import './App.css'

export default class App extends React.Component {
  maxId = 10

  state = {
    todoData: [],
    filterBtn: 'all',
  }

  addItem = (text) => {
    const newItem = this.creatNewTask(text)
    this.setState(({ todoData }) => {
      const newArray = [...todoData.slice(0), newItem]
      return { todoData: newArray }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const newTodoData = [...todoData.slice(0, index), ...todoData.slice(index + 1)]
      return {
        todoData: newTodoData,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItems = { ...oldItem, completed: !oldItem.completed, check: !oldItem.check }

      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (filterBtn) => {
    this.setState({ filterBtn })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed)
      return {
        todoData: [...newArray],
      }
    })
  }

  filterItem = () => {
    const { todoData, filterBtn } = this.state
    switch (filterBtn) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((item) => !item.completed)
      case 'completed':
        return todoData.filter((item) => item.completed)
      default:
        return todoData
    }
  }

  changeInput = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItems = { ...oldItem, editing: !oldItem.editing }

      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  creatNewTask(label) {
    this.maxId += 1
    return {
      label,
      completed: false,
      id: this.maxId,
      check: false,
      date: new Date(),
      editing: false,
    }
  }

  render() {
    const { todoData, filterBtn } = this.state
    const itemsCount = todoData.filter((el) => !el.completed).length
    const visibleItems = this.filterItem()

    return (
      <div className="todoapp">
        <section className="header">
          <NewTaskForm onItemAdded={this.addItem} />
        </section>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            changeInput={this.changeInput}
          />
          <Footer
            itemsCount={itemsCount}
            filterBtn={filterBtn}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    )
  }
}
