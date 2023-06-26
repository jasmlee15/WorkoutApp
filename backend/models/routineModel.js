const mongoose = require('mongoose')
const Workout = require('../models/workoutModel')

const Schema = mongoose.Schema

const routineSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    workouts: [Workout.schema], // Array of workout objects
    user_id: {
      type: String,
      required: true
    }
  });

const Routine = mongoose.model('Routine', routineSchema)
module.exports = Routine;