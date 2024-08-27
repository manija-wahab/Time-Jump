import { ChangeEvent, KeyboardEvent } from 'react'
import { NewCard } from '../../models/card'

export const useMainPageHandlers = (
  type: string,
  editCardId: number | null,
  text: string,
  setEditCardId: (id: number | null) => void,
  setText: (text: string) => void,
  setType: (type: string) => void,
  setTask: (task: string) => void,
  updateMutation: {
    mutate: (updatedCard: { id: number; content: string }) => void
  },
  mutation: { mutate: (newCard: NewCard) => void },
) => {
  const handleClick = (id: number, content: string) => {
    setEditCardId(id)
    setText(content)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleBlur = () => {
    if (editCardId !== null) {
      updateMutation.mutate({ id: editCardId, content: text })
      setEditCardId(null)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur()
    }
  }

  const handleButtonClick = (newType: string) => {
    setType(newType)
  }

  const handleSubmit = (task: string) => {
    mutation.mutate({ content: task, inProgress: false })
    setTask('')
  }

  return {
    handleClick,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleButtonClick,
    handleSubmit,
  }
}
