<template>
  <v-container>
    <v-row>
      <v-col class="d-flex text-h5 font-weight-medium">
        <p>Photos</p>
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="photoUpload = true">
          Upload
          <v-icon right>mdi-progress-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="photos.length > 0">
      <v-col class="photo-grid">
        <div
          v-for="(photo, i) in photos"
          :key="i"
          v-ripple
          class="photo-thumbnail elevation-1 rounded"
          :style="`background-image: url('${$config.driverApiUrl + photo.filename}');`"
          @click="openPhoto(photo)"
        ></div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>There are not photos.</v-col>
    </v-row>

    <v-dialog v-model="photoUpload" max-width="400" persistent>
      <PhotoUpload v-if="photoUpload" @close="photoUpload = false"></PhotoUpload>
    </v-dialog>
    <v-dialog v-model="photoView" max-width="400" persistent>
      <PhotoView
        v-if="photoView"
        :photo="photoSelected"
        @edit="editPhoto"
        @delete="deletePhoto"
        @close="photoView = null"
      ></PhotoView>
    </v-dialog>
    <v-dialog v-model="photoEdit" max-width="400" persistent>
      <PhotoEdit v-if="photoEdit" :photo="photoSelected" @close="photoEdit = null"></PhotoEdit>
    </v-dialog>
    <v-dialog v-model="photoDelete" max-width="350" persistent>
      <PhotoDelete
        v-if="photoDelete"
        :photo="photoSelected"
        @close="photoDelete = null"
      ></PhotoDelete>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'PhotosPage',
  layout: 'default',
  async asyncData({ $axios }) {
    try {
      const photos = await $axios.get('/api/photos')
      return { photos: photos.data }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  data() {
    return {
      photos: [],
      photoUpload: false,
      photoSelected: false,
      photoView: false,
      photoEdit: false,
      photoDelete: false,
    }
  },
  methods: {
    openPhoto(photo) {
      this.photoSelected = photo
      this.photoView = true
    },
    editPhoto() {
      this.photoView = false
      this.photoEdit = true
    },
    deletePhoto() {
      this.photoView = false
      this.photoDelete = true
    },
  },
}
</script>

<style scoped lang="scss">
.photo-grid {
  display: grid;
  gap: 12px;

  .photo-thumbnail {
    position: relative;
    overflow: hidden;
    height: 160px;
    background-size: contain;
    background-position: center center;
    background-color: white;
    cursor: pointer;
  }

  @media screen {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
