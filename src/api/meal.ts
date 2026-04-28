import request from './request'
import type { ApiResponse, Meal } from '@/types'

export function getMealsByDate(date: string) {
  return request.get<unknown, ApiResponse<Meal[]>>('/meals', {
    params: { date },
  })
}

export function createMeal(payload: Omit<Meal, 'id'>) {
  return request.post<unknown, ApiResponse<Meal>>('/meals', payload)
}

export function updateMeal(id: string, payload: Partial<Omit<Meal, 'id'>>) {
  return request.put<unknown, ApiResponse<Meal>>(`/meals/${id}`, payload)
}

export function deleteMeal(id: string) {
  return request.delete<unknown, ApiResponse<null>>(`/meals/${id}`)
}
