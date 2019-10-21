<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="text"
      placeholder="New task..."
      autofocus
    ></v-text-field>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewTask',
  data: () => ({
    text: '',
  }),
  methods: {
    submit() {
      if (!this.text) return
      this.createTask(this.text)
      this.text = ''
    },
    ...mapActions(['createTask']),
  },
}
</script>
