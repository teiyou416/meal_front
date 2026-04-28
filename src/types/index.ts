export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface User {
  id: string
  name: string
  token?: string
  allergies: string[]
  dietaryPreferences: string[]
}

export interface Activity {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  intensity?: 'low' | 'medium' | 'high'
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Meal {
  id: string
  date: string
  type: MealType
  content: string
  calories?: number
}

export interface MealRecommendation {
  date: string
  title: string
  reason: string
  suggestedMeals: Array<{
    type: MealType
    content: string
  }>
}
