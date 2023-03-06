import React from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

import './App.css'

export default class App extends React.Component {
  maxId = 10

  state = {
    todoData: [],
    filterButtons: 'all',
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((item) => {
          if (item.time === 0) {
            return item
          }
          if (item.play) {
            item.time -= 1
          }
          return item
        })
        return {
          todoData: newArr,
        }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  addItem = (text, time) => {
    const newItem = this.creatNewTask(text, time)
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return { todoData: newArray }
    })
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id)
      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newTodoData,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id)

      const oldItem = todoData[idx]
      const newItems = { ...oldItem, completed: !oldItem.completed, check: !oldItem.check, play: false }

      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (filterButtons) => {
    this.setState({ filterButtons })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.completed)
      return {
        todoData: [...newArray],
      }
    })
  }

  filterItem = () => {
    const { todoData, filterButtons } = this.state
    switch (filterButtons) {
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
      const idx = todoData.findIndex((item) => item.id === id)

      const oldItem = todoData[idx]
      const newItems = { ...oldItem, editing: !oldItem.editing }

      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id)
      const oldItem = todoData[idx]
      const newItems = { ...oldItem, play: false }
      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id)
      const oldItem = todoData[idx]
      const newItems = { ...oldItem, play: true }
      const newArray = [...todoData.slice(0, idx), newItems, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  creatNewTask(label, time) {
    this.maxId += 1
    return {
      label,
      time,
      completed: false,
      id: this.maxId,
      check: false,
      date: new Date(),
      editing: false,
      play: false,
    }
  }

  render() {
    const { todoData, filterButtons } = this.state
    const itemsCount = todoData.filter((item) => !item.completed).length
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
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
          />
          <Footer
            itemsCount={itemsCount}
            filterButtons={filterButtons}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    )
  }
}
