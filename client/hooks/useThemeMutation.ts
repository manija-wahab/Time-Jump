import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { NewTheme } from '../../models/theme'

export const useThemesMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTheme: NewTheme & { username: string }) => {
      await request.post('/api/v1/themes').send(newTheme)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] })
    },
    onError: (error) => {
      console.error('Theme mutation error:', error)
    },
  })
}
