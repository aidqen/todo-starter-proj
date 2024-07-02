const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const SET_FILTER = 'SET_FILTER'
export const REMOVE_TODO = 'REMOVE_TODO'

const initialState = {
    todos: [],
    filterBy: { txt: '', importance: 0 },
    isLoading: false,
    loggedInUser: null,
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.todos }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        case 'REMOVE_TODO':
            return {...state, todos: state.todos.filter(todo => todo._id !== action.todoId)}
        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store


