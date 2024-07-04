import { todoService } from "../services/todo.service.js";
import { userService } from "../services/user.service.js";
import { REMOVE_TODO, SET_TODOS, SET_USER, UPDATE_TODO, store } from "./store.js";

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
                .then((todos) => store.dispatch({type: SET_TODOS, todos}))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
                .then(() => store.dispatch({type: REMOVE_TODO, todoId}))
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO 
    return todoService.save(todo)
            .then(() => store.dispatch({type, todo}))
}

export function setUser(type, credentials) {
    // Login / Signup
    userService[`${type}`](credentials)
            .then((user) => store.dispatch({type: SET_USER, user}))
}

export function logoutUser() {
    userService.logout()
        .then(() => store.dispatch({type: SET_USER, user: null}))
}