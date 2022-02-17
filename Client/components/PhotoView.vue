<template>
  <v-card>
    <v-card-title class="text-truncate">Photo view</v-card-title>
    <div class="d-flex justify-center py-2">
      <v-img
        :src="$config.driverApiUrl + photo.filename"
        width="100%"
        max-height="250px"
        contain
      ></v-img>
    </div>
    <v-card-text class="black--text">
      <div>
        {{ photo.title }}
        <br />
        <span class="text--secondary">{{ photo.description }}</span>
        <br />
        <div class="py-1 d-flex" style="gap: 5px">
          <v-chip v-for="(tag, i) in photo.tags" :key="i" small color="primary">{{ tag }}</v-chip>
        </div>
      </div>
      <v-divider class="my-2"></v-divider>
      <div class="comments px-1">
        <div v-for="(comment, i) of comments" :key="i" class="py-2 d-flex align-center">
          <v-icon left color="primary" size="20">mdi-comment</v-icon>
          <span class="text-truncate">{{ comment.text }}</span>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-icon small right v-bind="attrs" v-on="on">mdi-information</v-icon>
            </template>
            <span class="text-caption">
              {{ formatDate(comment.created) }}
            </span>
          </v-tooltip>
        </div>
        <div v-if="comments.length === 0" class="py-2">There are no comments.</div>
      </div>
      <div class="d-flex mt-4" style="gap: 10px">
        <v-text-field
          v-model="newComment.text"
          placeholder="Add a comment"
          dense
          hide-details
          class="text-body-2"
          @keydown.enter="addComment"
        ></v-text-field>
        <v-btn color="primary" small height="35"><v-icon small>mdi-send</v-icon></v-btn>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="closeDialog">Close</v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="error" class="px-4" @click="$emit('delete')">Delete</v-btn>
      <v-btn outlined color="primary" class="px-4" @click="$emit('edit')">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PhotoView',
  props: {
    photo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      comments: [],
      newComment: {
        text: '',
        loading: false,
      },
    }
  },
  async fetch() {
    this.comments = await fetch(
      `${this.$config.hostUrl}/api/photos/${this.photo.id}/comments`
    ).then((res) => res.json())
  },
  methods: {
    async addComment() {
      this.newComment.loading = true
      try {
        await this.$axios.post(`/api/photos/${this.photo.id}/comments`, {
          text: this.newComment.text,
        })
        this.newComment.text = ''
      } catch {}
      this.newComment.loading = false
      this.$fetch()
    },
    closeDialog() {
      this.$emit('close')
    },
    formatDate(date) {
      return new Date(date).toLocaleTimeString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.comments {
  max-height: 150px;
  overflow-y: auto;
}
</style>
