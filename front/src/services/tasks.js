import { api } from 'boot/axios'

export const getAllTasks = () => {
  return api.get('/tasks')
}

export function addTask (params) {
  return api.post('/tasks', params)
}

export function getTasksByList (id, params) {
  return api.get(`/tasks/lists/${id}`, params)
}

export function modifyTask (id, params) {
  return api.put(`/tasks/${id}`, params)
}

export function deleteTask (id) {
  return api.delete(`/tasks/${id}`)
}
