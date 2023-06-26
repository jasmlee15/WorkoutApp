import { useRoutinesContext } from '../hooks/useRoutinesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import Routines from '../pages/Routines'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RoutineDetails = ({ routine }) => {
  const { dispatch } = useRoutinesContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()


  const handleClick = () => {
    console.log("clicked", routine._id)
    navigate('/', { state: { routineid: routine._id } });
  };

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/routines/deleteRoutine/' + routine._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log(json)

    if (response.ok) {
      dispatch({type: 'DELETE_ROUTINE', payload: json})
    }
  }

  return (
    <div className="workout-details" onClick={handleClick}>
      <h4>{routine.title}</h4>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  )
}

export default RoutineDetails