<template>
  <v-pagination
    :value="page"
    @input="go"
    :length="numberOfPages"
    total-visible="5"
    circle
  ></v-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      page: parseInt(this.$route.params.page) || 1,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(
        this.$store.getters.sortedTasks.length /
          this.$store.state.ui.tasksPerPage
      )
    },
  },
  methods: {
    go(page) {
      this.page = page
      this.$router.push(page === 1 ? `/` : `/page/${page}`)
    },
  },
}
</script>
