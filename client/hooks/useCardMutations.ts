import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewCard } from '../../models/card'

export const useCardMutations = (type: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newCard: NewCard) => {
      await request.post(`/api/v1/cards/${type}`).send(newCard)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}
