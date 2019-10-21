<template>
  <v-toolbar dark flat>
    <v-toolbar-title
      >Completed {{ completedTasksCount }}/{{ tasksCount }}</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-select
      prefix="Sort by: "
      v-model="dateOrder"
      :items="dateOrders"
      hide-details
      class="toolbar-selector--date"
    ></v-select>
    <v-select
      prefix="Completed tasks: "
      v-model="completedOrder"
      :items="completedOrders"
      hide-details
      class="toolbar-selector--completed"
    ></v-select>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Toolbar',
  computed: {
    dateOrders() {
      return this.$store.state.ui.sortingOrders.date.map(([value, text]) => ({
        value,
        text,
      }))
    },
    completedOrders() {
      return this.$store.state.ui.sortingOrders.completed.map(
        ([value, text]) => ({
          value,
          text,
        })
      )
    },
    dateOrder: {
      get() {
        return this.$store.state.ui.sorting.date
      },
      set(value) {
        this.sortBy({ date: value })
      },
    },
    completedOrder: {
      get() {
        return this.$store.state.ui.sorting.completed
      },
      set(value) {
        this.sortBy({ completed: value })
      },
    },
    tasksCount() {
      return Object.keys(this.$store.state.tasks.data).length
    },
    completedTasksCount() {
      return Object.values(this.$store.state.tasks.data).reduce(
        (count, { isCompleted }) => (isCompleted ? count + 1 : count),
        0
      )
    },
  },
  methods: mapActions(['sortBy']),
}
</script>

<style scoped>
.toolbar-selector--date {
  width: 1em;
}

.toolbar-selector--completed {
  width: 6em;
  margin-left: 1em;
}
</style>
