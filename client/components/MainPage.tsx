import Tasks from './Tasks'
import { useState } from 'react'
import TabsBar from './TabsBar'
import Tabs from './Tabs'

interface AppThemeProps {
  themeColor: string
  themeImage: string
}

const MainPage = ({ themeColor, themeImage }: AppThemeProps) => {
  const [type, setType] = useState('daily')
  const [tab, setTab] = useState('memoir')

  const handleTabClick = (newType: string) => {
    setType(newType)
  }

  const setTabType = (newTab: string) => {
    setTab(newTab)
  }

  return (
    <div className="mainPage">
      <div className="contentsBox">
        <TabsBar
          onTabClick={handleTabClick}
          themeColor={themeColor}
          themeImage={themeImage}
        />
        <div className="contents">
          <Tasks type={type} themeColor={themeColor} themeImage={themeImage} />
          <Tabs themeColor={themeColor} tab={tab} setTabType={setTabType} />
          {/* No need to conditionally render Habits here, it's already handled in Tabs */}
        </div>
      </div>
      <div className="imagesBox">
        <img src={themeImage} alt="theme" className="themeImage" />
      </div>
    </div>
  )
}

export default MainPage
