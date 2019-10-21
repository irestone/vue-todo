<template>
  <div class="home">
    <NewTask />
    <TaskList />
  </div>
</template>

<script>
import NewTask from '@/components/forms/NewTask'
import TaskList from '@/components/TaskList'

export default {
  name: 'home',
  components: {
    NewTask,
    TaskList,
  },
}
</script>
