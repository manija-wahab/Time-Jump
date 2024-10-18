import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { NewTheme, Theme } from '../../models/theme'

interface DisplayThemeProp {
  setThemeColor: React.Dispatch<React.SetStateAction<string>>
  setThemeImage: React.Dispatch<React.SetStateAction<string>>
  setDisplayTheme: React.Dispatch<React.SetStateAction<boolean>>
  themeColor: string
}

const Themes = ({
  setThemeColor,
  setThemeImage,
  setDisplayTheme,
  themeColor,
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
    <div className="themesContainer">
      <div className="themeBox">
        <form
          onSubmit={handleSubmit}
          className="themeFormBox"
          style={{ borderColor: themeColor }}
        >
          <h1
            style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}
            className="themeHeader"
          >
            Add a new theme ✦
          </h1>

          <p className="themeText">Add Image Url:</p>
          <input
            value={newImage}
            onChange={handleImageChange}
            className="imageInput"
            style={{ borderColor: themeColor }}
          />
          <div className="themeText">
            <p className="themeText">Select Theme Color:</p>
            <input
              type="color"
              value={newColor}
              onChange={handleColorChange}
              className="themeColorInput"
              style={{ borderColor: themeColor }}
            />
          </div>

          <button
            className="addTheme"
            type="submit"
            style={{ borderColor: themeColor }}
          >
            Add Theme
          </button>
          <button
            className="addTheme"
            style={{ borderColor: themeColor }}
            type="button"
            onClick={() => {
              console.log('Close button clicked') // Debugging line
              setDisplayTheme(false)
            }}
          >
            Close
          </button>
        </form>
        <div className="mainThemeBox" style={{ borderColor: themeColor }}>
          {data?.map((theme) => (
            <div key={theme.id}>
              <button
                className="themesBox"
                onClick={() => handleThemeSelection(theme)}
                style={{ borderColor: themeColor }}
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
                style={{
                  borderColor: themeColor,
                }}
              >
                Delete Theme
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Themes
