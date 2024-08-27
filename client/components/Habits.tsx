import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Habit } from '../../models/habit'
import { useState } from 'react'

const Habits = () => {
  const [deleteDisplay, setDeleteDisplay] = useState<Record<number, boolean>>(
    {},
  )
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await request.get('/api/v1/habits')
      return response.body as Habit[]
    },
  })

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await request.patch(`/api/v1/habits/${id}/increment`)
      return response.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const mutateLess = useMutation({
    mutationFn: async (id: number) => {
      const response = await request.patch(`/api/v1/habits/${id}/decrement`)
      return response.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const deleteHabit = useMutation({
    mutationFn: async (id: number) => {
      const response = await request.delete(`/api/v1/habits/${id}`)
      return response.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })

  const toggleDeleteDisplay = (id: number) => {
    setDeleteDisplay((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading cards</div>

  //    style={{ textShadow: ` 0 0 calc(1vh + 1vw) ${habit.color}` }}

  return (
    <div className="habitBox">
      {data?.map((habit: Habit) => (
        <div key={habit.id} className="habitSection">
          <div className="habitNameBox">
            <h1 className="habitName" style={{ textShadow: `none` }}>
              {habit.name}
            </h1>
            <button
              style={{ textShadow: ` 0 0 calc(0.5vh + 0.5vw) ${habit.color}` }}
              className="deleteHabitButton"
              onClick={() => toggleDeleteDisplay(habit.id)}
            >
              ✦
            </button>
            {deleteDisplay[habit.id] && (
              <button
                style={{ textShadow: ` 0 0 calc(1vh + 1vw) ${habit.color}` }}
                className="deleteHabitButton2"
                onClick={() => {
                  deleteHabit.mutate(habit.id)
                  setDeleteDisplay((prev) => ({
                    ...prev,
                    [habit.id]: false,
                  }))
                }}
              >
                Delete
              </button>
            )}
          </div>

          <div className="habitDetsBox">
            <div className="text">
              <p className="habitDet">Progress: {habit.count} Days</p>
              <p className="habitDet">Goal: {habit.goal} Days</p>
            </div>
            <div className="habitButtonsBox">
              <button
                className="habitButton"
                style={{
                  boxShadow: ` 0 0 calc(0.5vh + 0.5vw) ${habit.color}`,
                  color: `${habit.color}`,
                }}
                onClick={() => mutateLess.mutate(habit.id)}
              >
                -
              </button>
              <button
                className="habitButton"
                style={{
                  boxShadow: ` 0 0 calc(0.5vh + 0.5vw) ${habit.color}`,
                  color: `${habit.color}`,
                }}
                onClick={() => mutation.mutate(habit.id)}
              >
                +
              </button>
            </div>
          </div>

          <div className="circleBox">
            <div className="circles">
              {Array.from({ length: habit.goal }).map((_, index) => (
                <div
                  className="circ"
                  key={index}
                  style={{
                    backgroundColor:
                      index < habit.count
                        ? 'white'
                        : 'rgba(255, 255, 255, 0.324)',
                    boxShadow:
                      index < habit.count
                        ? `0 0 calc(0.5vh + 0.5vw) ${habit.color}`
                        : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Habits
