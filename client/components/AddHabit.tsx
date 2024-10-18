import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewHabit } from '../../models/habit'

import React, { useState } from 'react'

interface AddHabitProps {
  themeColor: string
  setTabType: (newTab: string) => void
}

const AddHabit = ({ themeColor }: AddHabitProps) => {
  const queryClient = useQueryClient()
  const [displayForm, setDisplayForm] = useState(false)

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
    <div className="cat">
      <button
        className="addHabbitRealButton"
        onClick={() => setDisplayForm(true)}
        type="submit"
      >
        Add Habit
        <div className="addHabitBut">✦</div>
      </button>
      {displayForm && (
        <form
          onSubmit={handleSubmit}
          className="habitForm"
          style={{ borderColor: `${themeColor}` }}
        >
          <p className="habitTextMain">Add A New Habit</p>
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
              placeholder="Habit Goal Count"
            />
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
              borderColor: `${themeColor}`,
            }}
          >
            Add Habit
          </button>
          <button
            className="habitSubmit"
            onClick={() => setDisplayForm(false)}
            style={{
              borderColor: `${themeColor}`,
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
