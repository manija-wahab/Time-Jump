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
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const username = localStorage.getItem('loggedUsername') || ''

  const mutation = useMutation({
    mutationFn: async (newHabit: NewHabit & { username: string }) => {
      await request.post('/api/v1/habits').send(newHabit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
      setDisplayForm(false) // Close the form on success
      setHabitName('')
      setHabitGoal('')
      setHabitColor('#ffffff')
      setError(null) // Reset error on success
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validation
    if (!habitName || habitGoal === '') {
      setError('Please fill in all required fields.')
      return
    }

    setIsLoading(true)
    mutation.mutate({
      name: habitName,
      goal: habitGoal,
      color: habitColor,
      username,
    })
    setIsLoading(false)
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
        type="button"
      >
        Add Habit
        <div className="addHabitBut">✦</div>
      </button>
      {displayForm && (
        <form
          onSubmit={handleSubmit}
          className="habitForm"
          style={{ borderColor: themeColor }}
        >
          <p className="habitTextMain">Add A New Habit</p>
          {error && <p className="errorText">{error}</p>}
          <p className="habitText">Habit Name:</p>
          <input
            style={{ borderColor: themeColor }}
            value={habitName}
            className="habitInput"
            onChange={handleNameChange}
            placeholder="Habit Name"
            required // Add required attribute for better validation
          />
          <p className="habitText">Goal:</p>
          <div className="habitGoal">
            <input
              style={{ borderColor: themeColor }}
              className="habitInput"
              type="number"
              value={habitGoal === '' ? '' : habitGoal}
              onChange={handleGoalChange}
              placeholder="Habit Goal Count"
              required // Add required attribute for better validation
            />
          </div>
          <div className="habitColor">
            <p className="habitText">Color:</p>
            <input
              type="color"
              value={habitColor}
              onChange={handleHabitColor}
              className="habitColorInput"
              style={{ borderColor: themeColor }}
            />
          </div>

          <button
            className="habitSubmit"
            type="submit"
            style={{ borderColor: themeColor }}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Adding...' : 'Add Habit'}
          </button>
          <button
            className="habitSubmit"
            onClick={() => setDisplayForm(false)}
            style={{ borderColor: themeColor }}
            type="button" // Prevent form submission
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default AddHabit
