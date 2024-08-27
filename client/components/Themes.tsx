import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { NewTheme, Theme } from '../../models/theme'

interface DisplayThemeProp {
  setThemeColor: React.Dispatch<React.SetStateAction<string>>
  setThemeImage: React.Dispatch<React.SetStateAction<string>>
  setDisplayTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const Themes = ({
  setThemeColor,
  setThemeImage,
  setDisplayTheme,
}: DisplayThemeProp) => {
  const [newImage, setNewImage] = useState('')
  const [newColor, setNewColor] = useState('')

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      const response = await request.get('/api/v1/themes')
      return response.body as Theme[]
    },
  })

  const mutation = useMutation({
    mutationFn: async (newTheme: NewTheme) => {
      await request.post('/api/v1/themes').send(newTheme)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] })
    },
  })

  const deleteTheme = useMutation({
    mutationFn: async (id: number) => {
      const response = await request.delete(`/api/v1/themes/${id}`)
      return response.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] })
    },
  })

  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor')
    const savedImage = localStorage.getItem('themeImage')

    if (savedColor && savedImage) {
      setThemeColor(savedColor)
      setThemeImage(savedImage)
    }
  }, [setThemeColor, setThemeImage])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      image: newImage,
      color: newColor,
    })
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(event.target.value)
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor(event.target.value)
  }

  const handleThemeSelection = (theme: Theme) => {
    setThemeColor(theme.color)
    setThemeImage(theme.image)
    setDisplayTheme(false)
    // Save theme to local storage
    localStorage.setItem('themeColor', theme.color)
    localStorage.setItem('themeImage', theme.image)
  }

  return (
    <div className="themeBox">
      <form onSubmit={handleSubmit} className="themeFormBox">
        <p className="habitText">Add Image Url:</p>
        <input
          value={newImage}
          onChange={handleImageChange}
          className="imageInput"
        />
        <div className="themeColorInputBox">
          <p className="habitText">Select Theme Color:</p>
          <input
            type="color"
            value={newColor}
            onChange={handleColorChange}
            className="themeColorInput"
          />
        </div>

        <button className="addTheme" type="submit">
          Add Theme
        </button>
        <button
          className="addTheme"
          type="button"
          onClick={() => {
            console.log('Close button clicked') // Debugging line
            setDisplayTheme(false)
          }}
        >
          Close
        </button>
      </form>
      <div className="mainThemeBox">
        {data?.map((theme) => (
          <div key={theme.id}>
            <button
              className="themesBox"
              onClick={() => handleThemeSelection(theme)}
            >
              <div className="themeImageBox">
                <img className="themeImage" src={theme.image} alt="theme" />
              </div>
              <div
                className="themeColor"
                style={{ backgroundColor: theme.color }}
              ></div>
            </button>
            <button
              className="deleteTheme"
              onClick={() => deleteTheme.mutate(theme.id)}
            >
              Delete Theme
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Themes
