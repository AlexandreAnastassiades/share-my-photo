<template>
  <v-app id="app">
    <v-app-bar app color="shade" elevation="1" height="80">
      <v-container class="d-flex justify-start">
        <nuxt-link to="/photos" style="text-decoration: none">
          <span
            class="text-h6 font-weight-bold primary--text d-flex align-center"
            style="gap: 10px"
          >
            <v-icon size="28" color="primary">mdi-share-circle</v-icon>
            Share my photos
          </span>
        </nuxt-link>

        <v-spacer></v-spacer>

        <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex align-center" style="gap: 10px">
          <v-btn text class="text-subtitle-1" active-class="primary--text" to="/photos">
            Photos
          </v-btn>
          <v-btn text class="text-subtitle-1" active-class="primary--text" to="/slideshow">
            Slideshow
          </v-btn>
          <v-btn text class="text-subtitle-1" active-class="primary--text" to="/search">
            Search
          </v-btn>
        </div>
        <v-menu v-else offset-y min-width="200px" rounded="lg">
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon size="28" color="#202020">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item to="/photos" active-class="primary--text">
              <v-list-item-title>Photos</v-list-item-title>
            </v-list-item>
            <v-list-item to="/slideshow" active-class="primary--text">
              <v-list-item-title>Slideshow</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="shade">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="11" lg="10">
            <nuxt></nuxt>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      links: ['Dashboard'],
    }
  },
  methods: {},
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdc2c9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9ba2ab;
}
</style>
