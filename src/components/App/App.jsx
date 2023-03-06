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

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((el) => {
          if (el.time === 0) {
            return el
          }
          if (el.play) {
            el.time -= 1
          }
          return el
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
      const idx = todoData.findIndex((el) => el.id === id)
      const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newTodoData,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItems = { ...oldItem, completed: !oldItem.completed, check: !oldItem.check, play: false }

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

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
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
      const idx = todoData.findIndex((el) => el.id === id)
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
            // updateTimer={this.updateTimer}
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
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
