import { NewCard, Card } from '../../models/card'
import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
interface TaskFormProps {
  type: string
  themeColor: string
  themeImage: string
}

const Tasks = ({ themeColor, type }: TaskFormProps) => {
  // UseStates ✦
  const [task, setTask] = useState('')
  const [text, setText] = useState('')
  const [editCardId, setEditCardId] = useState<number | null>(null)

  const queryClient = useQueryClient()

  // Fetching cards by type ✦
  const { data } = useQuery({
    queryKey: ['cards', type],
    queryFn: async () => {
      const response = await request.get(`/api/v1/cards/${type}`)
      return response.body
    },
  })

  // Editing a card ✦
  const mutation = useMutation({
    mutationFn: async (newCard: NewCard) => {
      await request.post(`/api/v1/cards/${type}`).send(newCard)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
    },
  })

  // Deleting a card ✦
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/cards/${type}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
    },
  })

  // Updating a card ✦
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

  // Handling change for setting a task ✦
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  // Handling submit ✦
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editCardId !== null) {
      updateMutation.mutate({ id: editCardId, content: text })
      setEditCardId(null)
      setText('')
    } else {
      mutation.mutate({ content: task, inProgress: false })
      setTask('')
    }
  }

  // Handling click ✦
  const handleClick = (id: number, content: string) => {
    setEditCardId(id)
    setText(content)
  }

  // Handling card change ✦
  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  // Resetting edit state when the type changes ✦
  useEffect(() => {
    setEditCardId(null)
    setText('')
  }, [type])

  return (
    <div className="tasks">
      <h1 style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}>
        {type} ✦
      </h1>

      <form className="mainForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          aria-label="Task input"
          className="mainInput"
        />
        <button className="mainSubmit" type="submit">
          ✦
        </button>
      </form>

      <div className="cardsBox">
        {data?.map((card: Card) => (
          <div key={card.id} className="cardsFormBox">
            {editCardId === card.id ? (
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="mainForm mainFormInput"
                  style={{ borderColor: `${themeColor}` }}
                >
                  <input
                    style={{ borderColor: `${themeColor}` }}
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
                      onClick={() => deleteMutation.mutate(card.id)}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                className="card"
                onClick={() => handleClick(card.id, card.content)}
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
                <div className="cardContent">{card.content}</div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
