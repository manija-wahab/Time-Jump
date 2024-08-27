import Memoirs from './Memoirs'
import Tabs from './Tabs'
import Tasks from './Tasks'
import Habits from './Habits'
import AddHabit from './AddHabit'
import Themes from './Themes'
import { useState } from 'react'
import { useEffect } from 'react'

// style={{ borderColor: `${themeColor}` }}

const MainPage = () => {
  const [type, setType] = useState('daily')
  const [tab, setTab] = useState('memoir')
  const [displayTheme, setDisplayTheme] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [themeColor, setThemeColor] = useState('')
  const [themeImage, setThemeImage] = useState('')

  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor')
    const savedImage = localStorage.getItem('themeImage')

    if (savedColor && savedImage) {
      setThemeColor(savedColor)
      setThemeImage(savedImage)
    }
  }, [])

  const handleButtonClick = (newType: string) => {
    setType(newType)
  }

  const setTabType = (newTab: string) => {
    setTab(newTab)
  }

  return (
    <div>
      {displayTheme && (
        <Themes
          setDisplayTheme={setDisplayTheme}
          setThemeColor={setThemeColor}
          setThemeImage={setThemeImage}
        />
      )}
      <button
        style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}
        className="mainThemeButton"
        onClick={() => setDisplayTheme(true)}
      >
        ✦
      </button>
      <div className="mainContainer">
        <div className="app">
          <div className="box">
            <Tabs
              onTabClick={handleButtonClick}
              themeColor={themeColor}
              themeImage={themeImage}
            />
            <div className="cards">
              <Tasks
                themeColor={themeColor}
                themeImage={themeImage}
                type={type}
              />

              <div className="detailsBox">
                {tab === 'memoir' && (
                  <>
                    <h1
                      className="memoirTitleBox"
                      style={{
                        textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
                      }}
                    >
                      Memoirs ✦
                    </h1>
                    <div className="buttons">
                      <button
                        style={{
                          textShadow: `0 0 calc(1vh + 1vw) ${themeColor}`,
                        }}
                        className="tabs"
                        onClick={() => setTabType('memoir')}
                      >
                        Memoirs ✦
                      </button>
                      <button
                        style={{
                          textShadow: `0 0 calc(1vh + 1vw) ${themeColor}`,
                        }}
                        className="tabs"
                        onClick={() => setTabType('habits')}
                      >
                        Habits ✦
                      </button>
                    </div>
                    <Memoirs themeColor={themeColor} />
                  </>
                )}

                {tab === 'habits' && (
                  <>
                    <h1
                      className="habitTitleBox"
                      style={{
                        textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
                      }}
                    >
                      Habit Tracker
                      <button
                        style={{
                          textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}`,
                        }}
                        className="addHabitButton"
                        onClick={() => setDisplayForm(true)}
                      >
                        ✦
                      </button>
                    </h1>
                    <div className="buttons">
                      <button
                        style={{
                          textShadow: `0 0 calc(1vh + 1vw) ${themeColor}`,
                        }}
                        className="tabs"
                        onClick={() => setTabType('memoir')}
                      >
                        Memoirs ✦
                      </button>
                      <button
                        style={{
                          textShadow: `0 0 calc(1vh + 1vw) ${themeColor}`,
                        }}
                        className="tabs"
                        onClick={() => setTabType('habits')}
                      >
                        Habits ✦
                      </button>
                    </div>
                    <AddHabit
                      themeColor={themeColor}
                      displayForm={displayForm}
                      setDisplayForm={setDisplayForm}
                    />
                    <Habits />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="imageBox">
            <img className="imageOverlay" src={themeImage} alt="vagabond" />
            <img className="image" src={themeImage} alt="vagabond" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
