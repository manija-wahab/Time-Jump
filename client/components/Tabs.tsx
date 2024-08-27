interface TabsProps {
  onTabClick: (type: string) => void
}

const Tabs = ({ onTabClick }: TabsProps) => {
  const tabTypes = ['daily', 'weekly', 'monthly', 'yearly', 'lifely']

  return (
    <div className="tabs">
      {tabTypes.map((type) => (
        <button key={type} className="tab" onClick={() => onTabClick(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)} ✦
        </button>
      ))}
    </div>
  )
}

export default Tabs
