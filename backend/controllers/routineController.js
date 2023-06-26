const Routine = require('../models/routineModel')
const mongoose = require('mongoose')

// get all routines
const getRoutines = async (req, res) => {
  const user_id = req.user._id
  const routines = await Routine.find({user_id}).sort({createdAt: -1})

  res.status(200).json(routines)
}

// get a single routine
const getRoutine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such routine'})
  }

  const routine = await Routine.findById(id)

  if (!routine) {
    return res.status(404).json({error: 'No such routine'})
  }
  
  return res.status(200).json(routine)
}


// create new routine
const createRoutine = async (req, res) => {
  const {title} = req.body

  if(!title) {
    return res.status(400).json({ error: 'Please include a title for the routine' })
  }

  // add doc to db
  try {
    const { title } = req.body
    const user_id = req.user._id
    const workouts = []

    // Create a new routine in the database
    const newRoutine = await Routine.create({
      title,
      workouts,
      user_id
    });

    res.status(201).json({ message: 'Routine created successfully', newRoutine})
  } catch (error) {
    console.error('Error creating routine:', error)
    res.status(500).json({ error: 'Failed to create routine' })
  }
}

// delete a workout
const deleteRoutine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such routine'})
  }

  const routine = await Routine.findOneAndDelete({_id: id})

  if (!routine) {
    return res.status(400).json({error: 'No such routine'})
  }

  res.status(200).json({ message: 'Routine deleted successfully', routine})
}

// update a routine
const updateRoutine = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such routine'})
  }

  const routine = await Routine.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!routine) {
    return res.status(400).json({error: 'No such routine'})
  }

  res.status(200).json({ message: 'Routine updated successfully', routine})
}


module.exports = {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine,
  updateRoutine
}