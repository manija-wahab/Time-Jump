// Comp Imports ✦
import MainPage from './MainPage'
import Themes from './Themes'
// React Imports ✦
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  // React States ✦
  const [displayTheme, setDisplayTheme] = useState(false)
  const [themeColor, setThemeColor] = useState('')
  const [themeImage, setThemeImage] = useState('')

  // UseEffect for remembering theme ✦
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor')
    const savedImage = localStorage.getItem('themeImage')

    if (savedColor && savedImage) {
      setThemeColor(savedColor)
      setThemeImage(savedImage)
    }
  }, [])

  return (
    <div className="App">
      {/* Little ✦ button for changing themes*/}
      {displayTheme && (
        <Themes
          setDisplayTheme={setDisplayTheme}
          setThemeColor={setThemeColor}
          setThemeImage={setThemeImage}
          themeColor={themeColor}
          themeImage={themeImage}
        />
      )}
      <button
        style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}
        className="mainThemeButton"
        onClick={() => setDisplayTheme(true)}
      >
        ✦
      </button>
      {/* Main app layout component ✦ */}
      <MainPage
        themeColor={themeColor}
        themeImage={themeImage}
        setThemeColor={setThemeColor}
        setThemeImage={setThemeImage}
      />
    </div>
  )
}

export default App
