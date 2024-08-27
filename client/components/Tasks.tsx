import React, { useState } from 'react'
import request from 'superagent'
import { NewCard, Card } from '../../models/card'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface TaskFormProps {
  type: string
  themeColor: string
  themeImage: string
}
// style={{textShadow: `0 0 calc(1vh + 1vw) ${themeColor}`}}
// { themeColor, onTabClick }: TabsProps

const Tasks = ({ themeColor, type }: TaskFormProps) => {
  const [task, setTask] = useState('')
  const [editCardId, setEditCardId] = useState<number | null>(null)
  const [text, setText] = useState('')

  const queryClient = useQueryClient()

  const { data } = useQuery({
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
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`/api/v1/cards/${type}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', type] })
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

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

  const handleClick = (id: number, content: string) => {
    setEditCardId(id)
    setText(content)
  }

  const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div className="tasks">
      <h1 style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}>
        {type} ✦
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChange}
          aria-label="Task input"
          className="input"
        />
        <button className="submit" type="submit">
          ✦
        </button>
      </form>

      <div className="cardBox">
        {data?.map((card: Card) => (
          <div key={card.id} className="cardItem">
            {editCardId === card.id ? (
              <div>
                <form onSubmit={handleSubmit} className="tasksForm">
                  <input
                    style={{ borderColor: `${themeColor}` }}
                    type="text"
                    value={text}
                    onChange={handleCardChange}
                    className="cardInput"
                  />
                  <div className="buttonBoxes">
                    <button className="submitButton" type="submit">
                      Save
                    </button>
                    <button
                      className="submitButton"
                      type="button" // Prevents form submission
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
