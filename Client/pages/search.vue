<template>
  <v-container>
    <v-row>
      <v-col class="d-flex text-h5 font-weight-medium">
        <p>Search</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex" style="gap: 10px">
        <v-text-field
          v-model="searchField"
          class="rounded-lg"
          label="Search for photos"
          outlined
          dense
          hide-details
          @keydown.enter="search"
        ></v-text-field>
        <v-btn class="primary" height="100%" @click="search"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
    </v-row>
    <div v-if="research">
      <v-row>
        <v-col class="d-flex text-h6 font-weight-medium">
          <p>
            Result for
            <strong>{{ research }}</strong>
          </p>
        </v-col>
      </v-row>
      <v-row v-if="photos.length > 0">
        <v-col class="photo-grid">
          <div
            v-for="(photo, i) in photos"
            :key="i"
            v-ripple
            class="photo-thumbnail elevation-1 rounded"
            :style="`background-image: url('${$config.driverApiUrl + photo.filename}`"
            @click="openPhoto(photo)"
          ></div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>No photo was found.</v-col>
      </v-row>
    </div>

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
  name: 'SearchPage',
  layout: 'default',
  data() {
    return {
      searchField: '',
      loading: null,
      research: null,
      photos: [],
      photoSelected: false,
      photoView: false,
      photoEdit: false,
      photoDelete: false,
    }
  },
  methods: {
    async search() {
      if (!this.searchField) return
      this.loading = true
      try {
        const response = await this.$axios.get(`/api/search`, {
          params: {
            q: this.searchField,
          },
        })
        this.photos = response.data
        this.research = this.searchField
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
    },
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
