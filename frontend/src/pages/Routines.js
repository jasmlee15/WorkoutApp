import { useEffect }from 'react'
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useRoutinesContext } from "../hooks/useRoutinesContext"
import RoutineForm from "../components/RoutineForm"

// components
import RoutineDetails from '../components/RoutineDetails'
// import WorkoutForm from '../components/WorkoutForm'

const Routines = () => {
  const {routines, dispatch} = useRoutinesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRoutines = async () => {
      const response = await fetch('/api/routines/getRoutines', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ROUTINES', payload: json})
      }
    }

    if (user) {
      fetchRoutines()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {routines && routines.map((routine, index) => (
          <RoutineDetails key={index} routine={routine} />
        ))}
      </div>
      <RoutineForm />
    </div>
  )
}

export default Routines