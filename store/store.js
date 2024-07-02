const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const SET_FILTER = 'SET_FILTER'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const SAVE_TODO = 'SAVE_TODO'

const initialState = {
    todos: [],
    filterBy: { txt: '', importance: 0 },
    isLoading: false,
    loggedInUser: null,
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(todo => todo._id !== action.todoId)}
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.todo]}
        case SAVE_TODO:
            return {...state, todos: state.todos.map(todo => todo.id === action.todo._id ? action.todo : todo)}
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store


