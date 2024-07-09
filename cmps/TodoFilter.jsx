const { useState, useEffect, useRef } = React
const { useSelector } = ReactRedux

export function TodoFilter({ filterBy, setFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const timeoutRef = useRef(null)
  
  const filterStatus = ['All', 'Active', 'Done']

  useEffect(() => {
    debouncedHandleSearch(filterByToEdit)
  }, [filterByToEdit])
  

  const debounce = (func, delay) => {
    return (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleSearch = debounce(setFilterBy, 500)

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit(prevFilter => ({...prevFilter, [field]:value}))
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault()
    setFilterBy(filterByToEdit)
  }


  const { txt, importance } = filterByToEdit
  return (
    <section className="todo-filter">
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input
          value={txt}
          onChange={handleChange}
          type="search"
          placeholder="By Txt"
          id="txt"
          name="txt"
        />
        <label htmlFor="importance">Importance: </label>
        <input
          value={importance}
          onChange={handleChange}
          type="number"
          placeholder="By Importance"
          id="importance"
          name="importance"
          min={0}
          />

        <button hidden>Set Filter</button>
      </form>
      <div className="filter-by-status">
        {filterStatus.map(status => {
          return (
            <button
              className={`status ${filterBy.status === status ? 'active' : ''}`}
              key={status}
              onClick={() => setFilterBy({...filterBy, status})}
            >
              {status}
            </button>
          )
        })}
      </div>
    </section>
  )
}
