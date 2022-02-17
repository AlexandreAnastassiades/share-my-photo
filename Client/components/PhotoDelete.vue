<template>
  <v-card>
    <v-card-title class="font-weight-medium">Warning</v-card-title>
    <v-card-text>Are you sure you want to delete this photo?</v-card-text>

    <v-card-actions>
      <v-btn text @click="closeDialog">Close</v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :disabled="done" class="error px-4" @click="deletePhoto">
        <v-icon v-if="done">mdi-check</v-icon>
        <span v-else>Delete</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PhotoDelete',
  props: {
    photo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      done: false,
    }
  },
  methods: {
    async closeDialog() {
      if (this.done) await this.$nuxt.refresh()
      this.$emit('close')
    },
    async deletePhoto() {
      this.loading = true
      try {
        await this.$axios.delete(`/api/photos/${this.photo.id}`)
        this.done = true
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
