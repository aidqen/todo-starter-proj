import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [params.todoId])


    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodo)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
    }

    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details">
            <h1 className={(todo.isDone)? 'done' : ''}>{todo.txt}</h1>
            <h2>{(todo.isDone)? 'Done!' : 'In your list'}</h2>

            <h1>Todo importance: {todo.importance}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <Link to="/todo">Back to list</Link>
            <div>
                <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
                <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
            </div>
        </section>
    )
}