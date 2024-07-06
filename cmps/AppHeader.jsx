const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, logoutUser } from '../store/todo.actions.js'
import { ProgressBar } from './ProgressBar.jsx'

export function AppHeader() {
  const navigate = useNavigate()
  const todos = useSelector(state => state.todos)

  const user = useSelector(state => state.loggedInUser)

  function onLogout() {
    logoutUser()
  }

  const percentage = getTodosPercentage()

  function getTodosPercentage() {
    const todosSum = todos.length
    // console.log('todos:', todos)
    // console.log('todosSum:', todosSum)
    const todosNotDone = todos.filter(todo => !todo.isDone).length
    // console.log('todosNotDone:', todosNotDone)
    // console.log(todosSum / todosNotDone * 100);
    return Math.floor((todosNotDone / todosSum) * 100)
  }

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
