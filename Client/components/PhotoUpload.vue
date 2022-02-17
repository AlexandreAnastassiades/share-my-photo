<template>
  <v-card>
    <v-card-title class="font-weight-medium">Upload a photo</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="formValid" class="photo-form" :disabled="loading || done">
        <p>You can upload one or more photos.</p>
        <v-file-input
          v-model="photo.files"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon=""
          append-icon="mdi-camera"
          label="Photo files"
          multiple
          counter
          dense
          hide-details
          outlined
          :rules="requiredRule"
        ></v-file-input>
        <v-text-field
          v-model="photo.title"
          label="Title"
          outlined
          dense
          hide-details
          :rules="requiredRule"
        ></v-text-field>
        <v-textarea
          v-model="photo.description"
          label="Description"
          outlined
          dense
          hide-details
          rows="2"
          :rules="requiredRule"
        ></v-textarea>
        <v-combobox
          v-model="photo.tags"
          label="Add tags"
          multiple
          small-chips
          deletable-chips
          clearable
          outlined
          dense
          hide-details
          :rules="requiredRule"
        ></v-combobox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="closeDialog">Close</v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :disabled="done" class="primary px-4" @click="upload">
        <v-icon v-if="done">mdi-check</v-icon>
        <span v-else>Upload</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PhotoUpload',
  data() {
    return {
      formValid: false,
      photo: {
        title: '',
        description: '',
        tags: [],
        files: [],
      },
      requiredRule: [(v) => (!!v && v.length > 0) || 'Required!'],
      loading: false,
      done: false,
    }
  },
  methods: {
    async closeDialog() {
      if (this.done) await this.$nuxt.refresh()
      this.$emit('close')
    },
    async upload() {
      await this.$refs.form.validate()
      if (!this.formValid) return
      this.loading = true
      try {
        for (const file of this.photo.files) {
          const formData = new FormData()
          formData.append('title', this.photo.title)
          formData.append('description', this.photo.description)
          formData.append('tag', this.photo.tag)
          this.photo.tags.forEach((tag) => formData.append('tags[]', tag))

          formData.append('file', file)
          await this.$axios.post(`/api/photos`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }

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

<style scoped>
.photo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
