export const ui = {
  state: {
    sortingOrders: {
      date: [['newest', 'Newest'], ['oldest', 'Oldest']],
      completed: [
        ['show', 'Show'],
        ['show_first', 'Show first'],
        ['show_last', 'Show last'],
        ['hide', 'Hide'],
      ],
    },
    sorting: { date: 'newest', completed: 'show' },
    tasksPerPage: 2,
  },
  mutations: {
    setSorting(state, order) {
      state.sorting = { ...state.sorting, ...order }
    },
  },
  actions: {
    sortBy({ commit }, order) {
      commit('setSorting', order)
    },
  },
}
