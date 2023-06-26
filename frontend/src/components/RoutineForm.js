import { useState } from "react"
import { useRoutinesContext } from "../hooks/useRoutinesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const RoutineForm = () => {
  const { dispatch } = useRoutinesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    if (!title) {
        setError('Please provide a title for the workout routine')
        return
      }

    const routine = {title}

    const response = await fetch('/api/routines/createRoutine', {
      method: 'POST',
      body: JSON.stringify(routine),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_ROUTINE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Routine</h3>

      <label>Routine Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />


      {/* <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      /> */}

      <button>Add Routine</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RoutineForm