import { userService } from '../services/user.service.js'

const { useDispatch,useSelector } = ReactRedux
const { useRef } = React

export function UserDetails() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedInUser)
  const timeoutRef = useRef(null)

  function handleColorChange({target}) {
    const {name, value} = target

    dispatch({type: 'SET_USER', loggedInUser: {...user, [name]: value}})
    debouncedColorChange(user._id, name, value)
  }

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

  const debouncedColorChange = debounce(userService.updateUserColor, 1500)

  return (
    <section className="user-details">
      <h1>User Details</h1>
      <hr />
      <div className="user-details">
        <h3>
          Fullname: <span>
            {user ? user.fullname : ''}
            </span>
        </h3>
        <h3>
          Color: <input type="color" name='color' onChange={handleColorChange}/>
          Background Color: <input type="color" name='backgroundColor' onChange={handleColorChange}/>
        </h3>
      </div>
    </section>
  )
}
