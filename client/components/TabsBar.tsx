interface TabsProps {
  onTabClick: (type: string) => void
  themeColor: string
  themeImage: string
}

const TabsBar = ({ themeColor, onTabClick }: TabsProps) => {
  const tabTypes = ['daily', 'weekly', 'monthly', 'yearly', 'lifely']

  return (
    <div className="tabs">
      {tabTypes.map((type) => (
        <button
          key={type}
          style={{ textShadow: `0 0 calc(0.5vh + 0.5vw) ${themeColor}` }}
          className="tab"
          onClick={() => onTabClick(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} ✦
        </button>
      ))}
    </div>
  )
}

export default TabsBar
