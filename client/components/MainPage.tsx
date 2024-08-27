// import Habits from './Habits'
import Memoirs from './Memoirs'
import Tabs from './Tabs'
import Tasks from './Tasks'
import Habits from './Habits'
import AddHabit from './AddHabit'
import { useState } from 'react'

const MainPage = () => {
  const [type, setType] = useState('daily')
  const [tab, setTab] = useState('memoir')
  const [displayForm, setDisplayForm] = useState(false)

  const handleButtonClick = (newType: string) => {
    setType(newType)
  }

  const setTabType = (newTab: string) => {
    setTab(newTab)
  }

  return (
    <div>
      <div className="mainContainer">
        <div className="app">
          <div className="box">
            <Tabs onTabClick={handleButtonClick} />
            <div className="cards">
              <Tasks type={type} />

              <div className="detailsBox">
                {tab === 'memoir' && (
                  <>
                    <h1>Memoirs ✦</h1>
                    <Memoirs />
                  </>
                )}
                {tab === 'habits' && (
                  <>
                    <h1 className="habitTitleBox">
                      Habit Tracker{' '}
                      <button
                        className="addHabitButton"
                        onClick={() => setDisplayForm(true)}
                      >
                        ✦
                      </button>
                    </h1>
                    <AddHabit
                      displayForm={displayForm}
                      setDisplayForm={setDisplayForm}
                    />
                    <Habits />
                  </>
                )}
                <div className="buttons">
                  <button className="tabs" onClick={() => setTabType('memoir')}>
                    Memoirs ✦
                  </button>
                  <button className="tabs" onClick={() => setTabType('habits')}>
                    Habits ✦
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="imageBox">
            <img
              className="imageOverlay"
              src="https://wallpapers-clan.com/wp-content/uploads/2024/07/one-piece-luffy-confident-pose-wallpaper-scaled.jpg"
              alt="vagabond"
            />
            <img
              className="image"
              src="https://wallpapers-clan.com/wp-content/uploads/2024/07/one-piece-luffy-confident-pose-wallpaper-scaled.jpg"
              alt="vagabond"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
