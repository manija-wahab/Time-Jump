// Models Imports ✦
import { Memoir } from '../../models/memoir'
// React Imports ✦
import { useState } from 'react'
// Tanstack Imports ✦
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import request from 'superagent'

interface MemoirsProps {
  themeColor: string
  setTabType: (newTab: string) => void
}

const Memoirs = ({ themeColor, setTabType }: MemoirsProps) => {
  // React States ✦
  const [memoirContent, setMemoirContent] = useState('')
  const [editMemoirId, setEditMemoirId] = useState<number | null>(null)
  const [text, setText] = useState('')

  // Query Client ✦
  const queryClient = useQueryClient()

  // Fetching notes by type ✦
  const { data } = useQuery({
    queryKey: ['memoirs'],
    queryFn: async () => {
      const response = await request.get('/api/v1/memoirs')
      return response.body as Memoir[]
    },
  })

  // Adding a note ✦
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

  // Deleting a note ✦
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/memoirs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs'] })
    },
  })

  // Editing a note ✦
  const updateMutation = useMutation({
    mutationFn: async (updatedMemoir: { id: number; content: string }) => {
      await request
        .patch(`/api/v1/memoirs/${updatedMemoir.id}`)
        .send({ content: updatedMemoir.content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs'] })
    },
    onError: (error) => {
      console.error('Update failed:', error)
    },
  })

  // Handling change for adding content ✦
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoirContent(event.target.value)
  }

  // Handling submit ✦
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

  // Handling submit ✦
  const handleClick = (id: number, content: string) => {
    setEditMemoirId(id)
    setText(content)
  }

  // Handling card changes ✦
  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div className="notes">
      <h1 style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}>
        Notes&nbsp;
        <button
          style={{
            textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
          }}
          className="addHabitButton"
          onClick={() => setTabType('habits')} // Switch to "Habits"
        >
          ✦
        </button>
      </h1>

      {/* Form for adding a new note ✦ */}
      <form onSubmit={handleSubmit} className="mainForm">
        <input
          type="text"
          value={memoirContent}
          onChange={handleChange}
          aria-label="Memoir input"
          className="mainInput"
        />
        {/* Submit button for adding a note ✦ */}
        <button className="mainSubmit" type="submit">
          ✦
        </button>
      </form>

      {/* Box with all the notes ✦ */}
      <div className="memoirBox">
        {data?.map((memoir: Memoir) => (
          <div key={memoir.id} className="memoirFormBox">
            {editMemoirId === memoir.id ? (
              <form
                onSubmit={handleSubmit}
                className="mainForm mainFormInput"
                style={{ borderColor: `${themeColor}` }}
              >
                <input
                  type="text"
                  value={text}
                  onChange={handleCardChange}
                  className="mainInput"
                />
                <div className="buttonBoxes">
                  <button className="mainSubmit changeBtnSave" type="submit">
                    Save
                  </button>
                  <button
                    className="mainSubmit changeBtnDelete"
                    type="button"
                    onClick={() => deleteMutation.mutate(memoir.id)}
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="memoir"
                onClick={() => handleClick(memoir.id, memoir.content)}
                style={{ borderColor: `${themeColor}` }}
              >
                <div
                  className="star"
                  style={{
                    textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
                  }}
                >
                  ✦
                </div>
                <div className="memoirContent">{memoir.content}</div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Memoirs
