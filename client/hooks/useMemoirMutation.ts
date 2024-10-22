// useMemoirMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewMemoir } from '../../models/memoir'

export const useMemoirMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMemoir: {
      content: string
      username: string
    }): Promise<Partial<NewMemoir>> => {
      const response = await request.post('/api/v1/memoirs').send(newMemoir)
      return response.body
    },
    onSuccess: (newMemoir: Partial<NewMemoir>) => {
      queryClient.invalidateQueries({
        queryKey: ['memoirs', newMemoir.username],
      })
    },
  })
}
