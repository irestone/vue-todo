import Vue from 'vue'

import axios from 'axios'

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
