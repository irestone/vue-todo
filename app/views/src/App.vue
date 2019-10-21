<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col sm="8" lg="6">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
