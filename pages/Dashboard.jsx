const { useEffect, useState } = React
import {Chart} from '../cmps/Chart.jsx'
import { todoService } from '../services/todo.service.js'
import { loadTodos } from '../store/todo.actions.js'
const { useSelector } = ReactRedux

export function Dashboard() {

    const todosData = useSelector(state => state.todosData)
    const { todos } = todosData
    const [importanceStats, setImportanceStats] = useState([])

    useEffect(()=>{
        loadTodos()
        todoService.getImportanceStats()
            .then(setImportanceStats)
    }, [])


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {todos.length} Todos</h2>
            <hr />
            <h4>By Importance</h4>
            <Chart data={importanceStats}/>
        </section>
    )
}