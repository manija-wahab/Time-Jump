import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, NewCard } from '../../models/card'
import request from 'superagent'

// ╔════════════════╗
// ║   Get Routes   ║
// ╚════════════════╝

export function useLifely() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await request.get('/api/v1/cards/lifely')
      return response.body as Card[]
    },
  })
  return { data, isPending, isError }
}

export function useYearly() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await request.get('/api/v1/cards/yearly')
      return response.body as Card[]
    },
  })
  return { data, isPending, isError }
}

export function useMonthly() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await request.get('/api/v1/cards/monthly')
      return response.body as Card[]
    },
  })
  return { data, isPending, isError }
}

export function useWeekly() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await request.get('/api/v1/cards/weekly')
      return response.body as Card[]
    },
  })
  return { data, isPending, isError }
}

export function useDaily() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await request.get('/api/v1/cards/daily')
      return response.body as Card[]
    },
  })
  return { data, isPending, isError }
}

// ╔═════════════════╗
// ║   Post Routes   ║
// ╚═════════════════╝

export function useAddLifelyCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewCard) => {
      await request.post('/api/v1/cards/lifely').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['lifely'] })
    },
  })
}

export function useAddYearlyCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewCard) => {
      await request.post('/api/v1/cards/yearly').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['yearly'] })
    },
  })
}

export function useAddMonthlyCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewCard) => {
      await request.post('/api/v1/cards/monthly').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['monthly'] })
    },
  })
}
export function useAddWeeklyCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewCard) => {
      await request.post('/api/v1/cards/weekly').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['weekly'] })
    },
  })
}
export function useAddDailyCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: NewCard) => {
      await request.post('/api/v1/cards/daily').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['daily'] })
    },
  })
}
