import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewHabit } from '../../models/habit'

export const useHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newHabit: NewHabit & { username: string }) => {
      await request.post('/api/v1/habits').send(newHabit)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] })
    },
  })
}
