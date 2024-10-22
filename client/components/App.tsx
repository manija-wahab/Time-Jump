// Comp Imports ✦
import MainPage from './MainPage'
import Themes from './Themes'
// React Imports ✦
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const DEFAULT_THEME_COLOR = 'rgb(92, 81, 202'
  const DEFAULT_THEME_IMAGE =
    'https://w.wallhaven.cc/full/d6/wallhaven-d6y12l.jpg'
  // '#2d5833'   67, 152, 73  'https://i.pinimg.com/originals/38/d3/8c/38d38c6f7a75fc2b14434f89da6961f4.jpg'

  // React States ✦
  const [displayTheme, setDisplayTheme] = useState(false)
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR)
  const [themeImage, setThemeImage] = useState(DEFAULT_THEME_IMAGE)

  const navigate = useNavigate()

  // UseEffect for remembering theme ✦
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor')
    const savedImage = localStorage.getItem('themeImage')

    if (savedColor && savedImage) {
      setThemeColor(savedColor)
      setThemeImage(savedImage)
    }
  }, [])

  useEffect(() => {
    const loggedUsername = localStorage.getItem('loggedUsername')
    if (!loggedUsername) {
      navigate('/Login')
    }
  }, [navigate])

  const resetLocalStorage = () => {
    localStorage.removeItem('themeColor')
    localStorage.removeItem('themeImage')
    localStorage.removeItem('loggedUsername')
    setThemeColor(DEFAULT_THEME_COLOR)
    setThemeImage(DEFAULT_THEME_IMAGE)
    navigate('/Login')
  }

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to log out?')
    if (confirmReset) {
      resetLocalStorage()
    }
  }

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault()
    handleReset()
  }

  return (
    <div className="App">
      {/* Little ✦ button for changing themes*/}
      {displayTheme && (
        <Themes
          setDisplayTheme={setDisplayTheme}
          setThemeColor={setThemeColor}
          setThemeImage={setThemeImage}
          themeColor={themeColor}
        />
      )}
      <button
        style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}
        className="mainThemeButton"
        onClick={() => setDisplayTheme(true)}
        onContextMenu={handleRightClick}
      >
        ✦
      </button>
      {/* Main app layout component ✦ */}
      <MainPage themeColor={themeColor} themeImage={themeImage} />
    </div>
  )
}

export default App
