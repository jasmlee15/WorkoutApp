import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  // let { routineid } = useParams();
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  const { state } = useLocation();
  const { routineid } = state

  console.log("routineid,", routineid)
  // const routineId = location.state?.routineId;

  

  useEffect(() => {
    console.log("Home routine id", routineid)
    const fetchWorkouts = async () => {
    //   const response = await fetch('/api/workouts', {
    //     headers: {'Authorization': `Bearer ${user.token}`},
    //   })
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({type: 'SET_WORKOUTS', payload: json})
    //   }
    // }
    const routine = {routineid}
    console.log("home routine request", routine)

    const response = await fetch(`/api/workouts/getWorkouts/${routine}`, {
      method: 'POST',
      body: JSON.stringify(routine),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }})

      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm routineId={routineid}/>
    </div>
  )
}

export default Home