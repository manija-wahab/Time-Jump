import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewCard } from '../../models/card'

export const useCardMutation = (type: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newCard: {
      content: string
      username: string
    }): Promise<Partial<NewCard>> => {
      const response = await request.post(`/api/v1/cards/${type}`).send(newCard)
      return response.body
    },
    onSuccess: (newCard: Partial<NewCard>) => {
      queryClient.invalidateQueries({
        queryKey: ['cards', type, newCard.username],
      })
    },
  })
}
