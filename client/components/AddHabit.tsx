import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewHabit } from '../../models/habit'
import React, { useState } from 'react'

interface AddHabitProps {
  displayForm: boolean
  setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>
  themeColor: string
}

const AddHabit = ({
  displayForm,
  setDisplayForm,
  themeColor,
}: AddHabitProps) => {
  const queryClient = useQueryClient()
  const [habitName, setHabitName] = useState('')
  const [habitGoal, setHabitGoal] = useState<number | ''>('')
  const [habitColor, setHabitColor] = useState('#ffffff')

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
    setHabitGoal(value === '' ? '' : Number(value))
  }

  const handleHabitColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitColor(event.target.value)
  }

  return (
    <div>
      {displayForm && (
        <form
          onSubmit={handleSubmit}
          className="habitForm"
          style={{ borderColor: `${themeColor}` }}
        >
          <p className="habitText">Add A New Habit</p>
          <p className="habitText">Habit Name:</p>
          <input
            style={{ borderColor: `${themeColor}` }}
            value={habitName}
            className="habitInput"
            onChange={handleNameChange}
            placeholder="Habit Name"
          />
          <p className="habitText">Goal: </p>
          <div className="habitGoal">
            <input
              style={{ borderColor: `${themeColor}` }}
              className="habitInput"
              type="number"
              value={habitGoal === '' ? '' : habitGoal}
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
              style={{ borderColor: `${themeColor}` }}
            />
          </div>

          <button
            className="habitSubmit"
            type="submit"
            style={{
              boxShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
              color: `${themeColor}`,
            }}
          >
            Add Habit
          </button>
          <button
            className="habitSubmit"
            onClick={() => setDisplayForm(false)}
            style={{
              boxShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
              color: `${themeColor}`,
            }}
          >
            cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default AddHabit
