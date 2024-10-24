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

  // Retrieve username from local storage
  const username = localStorage.getItem('loggedUsername') || ''

  // Query Client ✦
  const queryClient = useQueryClient()

  // Fetching memoirs by username ✦
  const { data } = useQuery({
    queryKey: ['memoirs', username],
    queryFn: async () => {
      const response = await request.get(`/api/v1/memoirs?username=${username}`)
      return response.body as Memoir[]
    },
  })

  // Adding a memoir ✦
  const mutation = useMutation({
    mutationFn: async (
      newMemoir: Omit<Memoir, 'id' | 'created_at'> & { id?: number },
    ) => {
      await request.post('/api/v1/memoirs').send({ ...newMemoir, username })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs', username] })
    },
  })
  // Deleting a memoir ✦
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/memoirs/${id}`).send({ username })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs', username] })
    },
  })

  // Editing a memoir ✦
  const updateMutation = useMutation({
    mutationFn: async (updatedMemoir: { id: number; content: string }) => {
      await request
        .patch(`/api/v1/memoirs/${updatedMemoir.id}`)
        .send({ content: updatedMemoir.content, username })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memoirs', username] })
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
      mutation.mutate({ content: memoirContent, username })
      setMemoirContent('')
    }
  }

  // Handling click for editing a memoir ✦
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

      {/* Form for adding a new memoir ✦ */}
      <form onSubmit={handleSubmit} className="mainForm">
        <input
          type="text"
          value={memoirContent}
          onChange={handleChange}
          aria-label="Memoir input"
          className="mainInput"
        />
        {/* Submit button for adding a memoir ✦ */}
        <button className="mainSubmit" type="submit">
          ✦
        </button>
      </form>

      {/* Box with all the memoirs ✦ */}
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
