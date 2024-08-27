import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewHabit } from '../../models/habits'
import React, { useState } from 'react'

interface AddHabitProps {
  displayForm: boolean
  setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddHabit = ({ displayForm, setDisplayForm }: AddHabitProps) => {
  const queryClient = useQueryClient()
  const [habitName, setHabitName] = useState('')
  const [habitGoal, setHabitGoal] = useState<number | ''>('')
  const [habitColor, setHabitColor] = useState('#ffffff') // Default color

  const mutation = useMutation({
    mutationFn: async (newHabit: NewHabit) => {
      await request.post('/api/v1/habits').send(newHabit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      name: habitName,
      goal: habitGoal === '' ? 0 : habitGoal,
      color: habitColor,
    })
    setDisplayForm(false)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value)
  }

  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setHabitGoal(value === '' ? '' : Number(value)) // Handle empty input
  }

  const handleHabitColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitColor(event.target.value)
  }

  return (
    <div>
      {displayForm && (
        <form onSubmit={handleSubmit} className="habitForm">
          <p className="habitText">Add A New Habit</p>
          <p className="habitText">Habit Name:</p>
          <input
            value={habitName}
            className="habitInput"
            onChange={handleNameChange}
            placeholder="Habit Name"
          />
          <p className="habitText">Goal: </p>
          <div className="habitGoal">
            <input
              className="habitInput"
              type="number"
              value={habitGoal === '' ? '' : habitGoal} // Handle empty input
              onChange={handleGoalChange}
              placeholder="Habit Goal"
            />
            <p className="habitText goalText">Days </p>
          </div>
          <div className="habitColor">
            <p className="habitText">Color: </p>
            <input
              type="color"
              value={habitColor}
              onChange={handleHabitColor}
              className="habitColorInput"
            />
          </div>

          <button className="habitSubmit" type="submit">
            Add Habit
          </button>
          <button className="habitSubmit" onClick={() => setDisplayForm(false)}>
            cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default AddHabit
