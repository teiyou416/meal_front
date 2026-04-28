import request from './request'
import type { ApiResponse, User } from '@/types'

export function getCurrentUser() {
  return request.get<unknown, ApiResponse<User>>('/users/me')
}

export function updateUserPreferences(payload: Pick<User, 'allergies' | 'dietaryPreferences'>) {
  return request.put<unknown, ApiResponse<User>>('/users/me/preferences', payload)
}
