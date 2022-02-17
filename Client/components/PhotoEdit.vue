<template>
  <v-card>
    <v-card-title class="font-weight-medium">Edit a photo</v-card-title>
    <v-card-text class="pt-4">
      <v-form ref="form" v-model="formValid" class="photo-form" :disabled="loading || done">
        <v-text-field
          v-model="photoEdit.title"
          label="Title"
          outlined
          dense
          hide-details
          :rules="requiredRule"
        ></v-text-field>
        <v-textarea
          v-model="photoEdit.description"
          label="Description"
          outlined
          dense
          hide-details
          rows="2"
          :rules="requiredRule"
        ></v-textarea>
        <v-combobox
          v-model="photoEdit.tags"
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
      <v-btn :loading="loading" :disabled="done" class="primary px-4" @click="edit">
        <v-icon v-if="done">mdi-check</v-icon>
        <span v-else>Edit</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PhotoEdit',
  props: {
    photo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      photoEdit: {
        title: '',
        description: '',
        tags: [],
      },
      requiredRule: [(v) => (!!v && v.length > 0) || 'Required!'],
      loading: false,
      done: false,
    }
  },
  mounted() {
    // Copy photo information
    for (const key of Object.keys(this.photoEdit)) {
      this.photoEdit[key] = this.photo[key]
    }
  },
  methods: {
    async closeDialog() {
      if (this.done) await this.$nuxt.refresh()
      this.$emit('close')
    },
    async edit() {
      await this.$refs.form.validate()
      if (!this.formValid) return
      this.loading = true
      try {
        await this.$axios.patch(`/api/photos/${this.photo.id}`, {
          ...this.photoEdit,
        })

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
