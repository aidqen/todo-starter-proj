const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, logoutUser, setUser } from '../store/todo.actions.js'
import { ProgressBar } from './ProgressBar.jsx'
import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/store.js'

export function AppHeader() {
  const dispatch = useDispatch()
  const todosData = useSelector(state => state.todosData)
  const filterBy = useSelector(state => state.filterBy)

  const user = useSelector(state => state.loggedInUser)
  useEffect(() => {
    loadTodos(filterBy)
    const loggedInUser = userService.getLoggedinUser()
    dispatch({type:SET_USER, loggedInUser})
  }, [])

  function onLogout() {
    logoutUser()
  }

  const percentage = getTodosPercentage()

  function getTodosPercentage() {
    const { todosLength, todos }= todosData
    // console.log('todos:', todos)
    // console.log('todosSum:', todosSum)
    const todosNotDone = todos.filter(todo => !todo.isDone).length
    // console.log('todosNotDone:', todosNotDone)
    // console.log(todosSum / todosNotDone * 100);
    return Math.floor((todosNotDone / todosLength) * 100)
  }
  const {backgroundColor, color} = user || {backgroundColor: 'white', color: 'black'}
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Todo App</h1>
        {}
        {user ? (
          <React.Fragment>
            <ProgressBar percentage={percentage} />
            <section>
              <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
              <button onClick={onLogout}>Logout</button>
            </section>
          </React.Fragment>
        ) : (
          <section>
            <LoginSignup />
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
