import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, saveTodo } from '../store/todo.actions.js'
import { SET_FILTER } from '../store/store.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
  const dispatch = useDispatch()

  const todosData = useSelector(state => state.todosData)
  const { todos, filteredTodos } = todosData
  const isLoading = useSelector(state => state.isLoading)


  const [searchParams, setSearchParams] = useSearchParams()
  // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  const filterBy = useSelector(state => state.filterBy)

  useEffect(() => {
    setSearchParams(filterBy)
    loadTodos(filterBy).catch(err => {
      console.error('err:', err)
      showErrorMsg('Cannot load todos')
    })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg(`Todo removed`)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot remove todo ' + todoId)
      })
  }
  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    saveTodo(todoToSave).catch(err => {
      console.log('err:', err)
      showErrorMsg('Cannot toggle todo')
    })
  }
  function setFilterBy(filterBy) {
    dispatch({ type: SET_FILTER, filterBy })
  }

  if (!filteredTodos) return <div>Loading...</div>
  return (
    <section className="todo-index">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <React.Fragment>
          <TodoFilter filterBy={filterBy} setFilterBy={setFilterBy} />
          <div>
            <Link to="/todo/edit" className="btn">
              Add Todo
            </Link>
          </div>
          <h2>Todos List</h2>
          <TodoList
            todos={filteredTodos}
            onRemoveTodo={onRemoveTodo}
            onToggleTodo={onToggleTodo}
          />
          <hr />
          <h2>Todos Table</h2>
          <div style={{ width: '60%', margin: 'auto' }}>
            <DataTable todos={filteredTodos} onRemoveTodo={onRemoveTodo} />
          </div>
        </React.Fragment>
      )}
    </section>
  )
}
