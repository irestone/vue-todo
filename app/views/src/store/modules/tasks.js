import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'

// todo:
// - request handling
// - loadings

export const tasks = {
  state: { data: {} },
  mutations: {
    setAll(state, data) {
      Vue.set(state, 'data', data)
    },
    set({ data }, task) {
      Vue.set(data, task._id, task)
    },
    delete({ data }, id) {
      Vue.delete(data, id)
    },
  },
  getters: {
    allTasks({ data }) {
      return Object.values(data)
    },
    activeTasks({ data }) {
      return Object.values(data).filter(({ isCompleted }) => !isCompleted)
    },
    completedTasks({ data }) {
      return Object.values(data).filter(({ isCompleted }) => isCompleted)
    },
    sortedTasks(state, { allTasks, activeTasks, completedTasks }, rootState) {
      const sortingQueue = []

      switch (rootState.ui.sorting.completed) {
        case 'show':
          sortingQueue.push(allTasks)
          break
        case 'show_first':
          sortingQueue.push(completedTasks, activeTasks)
          break
        case 'show_last':
          sortingQueue.push(activeTasks, completedTasks)
          break
        case 'hide':
          sortingQueue.push(activeTasks)
          break
      }

      const sort =
        rootState.ui.sorting.date === 'newest'
          ? (tasks) => _.sortBy(tasks, ['createdAt']).reverse()
          : (tasks) => _.sortBy(tasks, ['createdAt'])

      return sortingQueue.map(sort).flat()
    },
    tasksOfPage(_, { sortedTasks }, { route, ui }) {
      const page = parseInt(route.params.page) || 1
      const end = page * ui.tasksPerPage
      const start = end - ui.tasksPerPage
      return sortedTasks.slice(start, end)
    },
  },
  actions: {
    async createTask({ commit }, text) {
      const { data: task } = await axios.post(`/api/tasks`, { text })
      commit('set', task)
    },
    async getTasks({ commit }) {
      const { data: tasks } = await axios.get(`/api/tasks`)
      commit('setAll', tasks)
    },
    async updateTask({ commit, state }, { _id, text }) {
      commit('set', { ...state.data[_id], text })
      const { data: task } = await axios.put(`/api/tasks/${_id}`, { text })
      commit('set', task)
    },
    async completeTask({ commit, state }, id) {
      commit('set', { ...state.data[id], isCompleted: true })
      const { data: task } = await axios.put(`/api/tasks/${id}`, {
        isCompleted: true,
      })
      commit('set', task)
    },
    async activateTask({ commit, state }, id) {
      commit('set', { ...state.data[id], isCompleted: false })
      const { data: task } = await axios.put(`/api/tasks/${id}`, {
        isCompleted: false,
      })
      commit('set', task)
    },
    async deleteTask({ commit }, id) {
      commit('delete', id)
      await axios.delete(`/api/tasks/${id}`)
    },
  },
}
