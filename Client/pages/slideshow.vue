<template>
  <v-container>
    <v-row>
      <v-col class="d-flex text-h5 font-weight-medium">
        <p>Slideshow</p>
      </v-col>
    </v-row>
    <v-row v-if="!socket.connected">
      <v-col class="text-center">
        <p>Connecting to server...</p>
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-else-if="photos.length > 0" class="flex-column-reverse flex-md-column">
      <v-col cols="12">
        <SlideshowView
          v-if="currentPhoto"
          :key="currentId"
          ref="slideshowView"
          :photo="currentPhoto"
          @refresh="refresh"
        ></SlideshowView>
      </v-col>
      <v-col class="d-flex">
        <v-btn color="primary" @click="previous"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="next"><v-icon>mdi-arrow-right</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>There are not photos.</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { io } from 'socket.io-client'

export default {
  name: 'SlideshowPage',
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      const photos = await $axios.get('/api/photos')
      return { photos: photos.data, currentId: photos.data[0].id }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  data() {
    return {
      socket: {},
      photos: [],
      currentId: null,
    }
  },
  computed: {
    currentPhoto() {
      return this.photos.find((p) => p.id === this.currentId)
    },
  },
  mounted() {
    this.socket = io.connect(this.$config.hostUrl, { path: `/api/socket.io` })

    this.socket.on('change', (data) => {
      this.currentId = data.id
    })
    this.socket.on('refresh', () => {
      this.$refs.slideshowView.$fetch()
    })
    this.socket.emit('join', { id: this.photos[0].id })
  },
  methods: {
    refresh() {
      this.socket.emit('refresh')
      this.$refs.slideshowView.$fetch()
    },
    previous() {
      const index = this.photos.findIndex((p) => p.id === this.currentId)
      this.currentId = this.photos[index > 0 ? index - 1 : this.photos.length - 1].id
      this.socket.emit('change', { id: this.currentId })
    },
    next() {
      const index = this.photos.findIndex((p) => p.id === this.currentId)
      this.currentId = this.photos[index < this.photos.length - 1 ? index + 1 : 0].id
      this.socket.emit('change', { id: this.currentId })
    },
  },
}
</script>

<style scoped lang="scss">
.title-gradient {
  background: #8356f6;
  background: -webkit-linear-gradient(to right, #8356f6 0%, #5419f7 100%);
  background: -moz-linear-gradient(to right, #8356f6 0%, #5419f7 100%);
  background: linear-gradient(to right, #8356f6 0%, #5419f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
