const express = require('express')
const {
  createRoutine,
  getRoutines,
  getRoutine,
  deleteRoutine,
  updateRoutine
} = require('../controllers/routineController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all Routines
router.get('/getRoutines', getRoutines)

//GET a single routine
router.get('/getRoutine/:id', getRoutine)

// POST a new routine
router.post('/createRoutine', createRoutine)

// DELETE a routine
router.delete('/deleteRoutine/:id', deleteRoutine)

// UPDATE a routine
router.patch('/updateRoutine/:id', updateRoutine)

module.exports = router