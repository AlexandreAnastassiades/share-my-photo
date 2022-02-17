<template>
  <v-container>
    <v-row class="mb-16">
      <v-col class="text-center">
        <p class="text-h4 font-weight-medium">
          {{ error && error.statusCode === 404 ? pageNotFound : otherError }}
        </p>
        <p class="text-h6 font-weight-medium">
          <NuxtLink to="/photos">Back to photos page</NuxtLink>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style></style>
