<template>
  <div class="task-list">
    <Toolbar />
    <v-list>
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
        :class="{ 'grey lighten-4': task.isCompleted }"
      >
        <v-list-item-avatar>
          <v-btn
            v-if="task.isCompleted"
            icon
            @click.stop="activateTask(task._id)"
          >
            <v-icon>mdi-radiobox-marked</v-icon>
          </v-btn>
          <v-btn v-else icon @click.stop="completeTask(task._id)">
            <v-icon>mdi-radiobox-blank</v-icon>
          </v-btn>
        </v-list-item-avatar>
        <v-list-item-content v-if="editing && editing._id === task._id">
          <v-form @submit.prevent="saveEdit">
            <v-text-field
              v-model="editing.text"
              hide-details
              dense
              autofocus
              onFocus="this.select()"
              @blur="cancelEdit"
              @keyup.esc="cancelEdit"
            ></v-text-field>
          </v-form>
        </v-list-item-content>
        <v-list-item-content
          v-else
          :style="{ cursor: 'text' }"
          @click="edit(task)"
          >{{ task.text }}</v-list-item-content
        >
        <v-list-item-action>
          <v-btn icon @click.stop="deleteTask(task._id)">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Toolbar from './taskList/Toolbar'

export default {
  name: 'TaskList',
  components: { Toolbar },
  data: () => ({
    editing: null,
  }),
  computed: mapState({ tasks: (state) => state.tasks.data }),
  methods: {
    edit(task) {
      this.editing = task
    },
    cancelEdit() {
      this.editing = null
    },
    saveEdit() {
      if (!this.editing.text.trim()) return
      this.updateTask(this.editing)
      this.cancelEdit()
    },
    ...mapActions([
      'getTasks',
      'updateTask',
      'completeTask',
      'activateTask',
      'deleteTask',
    ]),
  },
  mounted() {
    this.getTasks()
  },
}
</script>
