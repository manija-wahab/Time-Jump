import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Habit } from '../../models/habits'
import { useState } from 'react'

const Habits = () => {
  const [deleteDisplay, setDeleteDisplay] = useState(false)
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await request.get('/api/v1/ahabits')
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

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading cards</div>

  return (
    <div className="habitBox">
      {data?.map((habit: Habit) => (
        <div key={habit.id}>
          <div className="habitNameBox">
            <h1 className="habitName">{habit.name}</h1>
            <button
              className="deleteHabitButton"
              onClick={() => setDeleteDisplay(true)}
            >
              ✦
            </button>
            {deleteDisplay && (
              <button
                className="deleteHabitButton2"
                onClick={() => {
                  deleteHabit.mutate(habit.id), setDeleteDisplay(false)
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
                onClick={() => mutateLess.mutate(habit.id)}
              >
                -
              </button>
              <button
                className="habitButton"
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
                      index < habit.count ? `0 0 10px ${habit.color}` : 'none',
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
