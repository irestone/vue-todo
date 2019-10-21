<template>
  <v-toolbar dark flat>
    <v-toolbar-title
      >Completed {{ completedTasksCount }}/{{ tasksCount }}</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-select
      prefix="Sort by: "
      v-model="dateOrder"
      :items="orders.date"
      hide-details
      class="toolbar-selector--date"
    ></v-select>
    <v-select
      prefix="Completed tasks: "
      v-model="completedOrder"
      :items="orders.completed"
      hide-details
      class="toolbar-selector--completed"
    ></v-select>
  </v-toolbar>
</template>

<script>
const orders = {
  date: [
    { text: 'Newest', value: 'newest' },
    { text: 'Oldest', value: 'oldest' },
  ],
  completed: [
    { text: 'Show', value: 'show' },
    { text: 'Show first', value: 'show_first' },
    { text: 'Show last', value: 'show_last' },
    { text: 'Hide', value: 'hide' },
  ],
}

export default {
  name: 'Toolbar',
  data: () => ({
    orders,
    dateOrder: orders.date[0],
    completedOrder: orders.completed[0],
  }),
  computed: {
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
