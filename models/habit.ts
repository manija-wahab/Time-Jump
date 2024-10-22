export interface Habit {
  id: number
  name: string
  count: number
  goal: number
  color: string
  username: string
}

export interface HabitData {
  name: string
  username: string
}

export interface NewHabit {
  name: string
  goal: number
  color: string
  username: string
}
