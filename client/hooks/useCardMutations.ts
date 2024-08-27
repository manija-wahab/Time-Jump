import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewCard } from '../../models/card'
import { NewDetail } from '../../models/memoir'

export const useCardMutations = (type: string, editCardId: number | null) => {
  const queryClient = useQueryClient()

  const { data, isPending, isError } = useQuery({
    queryKey: ['cards', type],
    queryFn: async () => {
      const response = await request.get(`/api/v1/cards/${type}`)
      return response.body
    },
  })

  const mutation = useMutation({
    mutationFn: async (newCard: NewCard) => {
      await request.post(`/api/v1/cards/${type}`).send(newCard)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (updatedCard: { id: number; content: string }) => {
      await request
        .patch(`/api/v1/cards/${type}/${updatedCard.id}`)
        .send({ content: updatedCard.content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
    },
  })

  const detailMutation = useMutation({
    mutationFn: async (newDetail: NewDetail) => {
      if (editCardId !== null) {
        await request
          .post(`/api/v1/cards/${type}/${editCardId}/details`)
          .send(newDetail)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
    },
  })

  return { data, isPending, isError, mutation, updateMutation, detailMutation }
}
