import Habits from './Habits'
import Memoirs from './Memoirs'
import { useState } from 'react'

interface Props {
  tab: string
  themeColor: string
  setTabType: (newTab: string) => void
}

const Tabs = ({ themeColor, tab, setTabType }: Props) => {
  const [displayForm, setDisplayForm] = useState(false)

  return (
    <div className="tabsContainer">
      {/* Render Memoirs Component */}
      {tab === 'memoir' && (
        <Memoirs themeColor={themeColor} setTabType={setTabType} />
      )}

      {/* Render Habits Component */}
      {tab === 'habits' && (
        <div className="habitsContain">
          <Habits
            themeColor={themeColor}
            displayForm={displayForm}
            setDisplayForm={setDisplayForm}
            setTabType={setTabType}
          />
        </div>
      )}
    </div>
  )
}

export default Tabs
