export interface Habit {
  id: number
  name: string
  count: number
  goal: number
  color: string
}

export interface HabitData {
  name: string
}

export interface NewHabit {
  name: string
  goal: number
  color: string
}
