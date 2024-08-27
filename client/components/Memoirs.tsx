import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import request from 'superagent'
import { Memoir } from '../../models/memoir'
import { useState } from 'react'

const Memoirs = () => {
  const [memoirContent, setMemoirContent] = useState('')
  const [editMemoirId, setEditMemoirId] = useState<number | null>(null)
  const [text, setText] = useState('')

  const queryClient = useQueryClient()

  // Fetching the memoirs
  const { data, isPending, isError } = useQuery({
    queryKey: ['memoirs'],
    queryFn: async () => {
      const response = await request.get('/api/v1/memoirs')
      return response.body as Memoir[]
    },
  })

  const mutation = useMutation({
    mutationFn: async (
      newMemoir: Omit<Memoir, 'id' | 'created_at'> & { id?: number },
    ) => {
      await request.post('/api/v1/memoirs').send(newMemoir)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/memoirs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (updatedMemoir: { id: number; content: string }) => {
      await request
        .patch(`/api/v1/memoirs/${updatedMemoir.id}`)
        .send({ content: updatedMemoir.content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs'] })
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoirContent(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editMemoirId !== null) {
      updateMutation.mutate({ id: editMemoirId, content: text })
      setEditMemoirId(null)
      setText('')
    } else {
      mutation.mutate({ content: memoirContent })
      setMemoirContent('')
    }
  }

  const handleClick = (id: number, content: string) => {
    setEditMemoirId(id)
    setText(content)
  }

  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading memoirs</div>

  return (
    <div className="memoirContain">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={memoirContent}
          onChange={handleChange}
          aria-label="Memoir input"
          className="input"
        />
        <button className="submit" type="submit">
          ✦
        </button>
      </form>

      <div className="memoirBox">
        {data?.map((memoir: Memoir) => (
          <div key={memoir.id} className="memoirItem">
            {editMemoirId === memoir.id ? (
              <div className="memoirFormBox">
                <input
                  type="text"
                  value={text}
                  onChange={handleCardChange}
                  className="memoirInput"
                />
                <div className="buttonBoxes">
                  <button
                    className="submitButton"
                    type="submit"
                    onClick={() =>
                      updateMutation.mutate({ id: editMemoirId, content: text })
                    }
                  >
                    Save
                  </button>
                  <button
                    className="submitButton"
                    type="button"
                    onClick={() => deleteMutation.mutate(memoir.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="memoir"
                onClick={() => handleClick(memoir.id, memoir.content)}
              >
                <div className="star">✦</div>
                <div>{memoir.content}</div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Memoirs
