import Vue from 'vue'
import Router from 'vue-router'

import PhotosPage from '@/pages/photos'
import SlideshowPage from '@/pages/slideshow'
import SearchPage from '@/pages/search'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', redirect: '/photos' },
      {
        path: '/photos',
        component: PhotosPage,
        name: 'photos-page',
      },
      {
        path: '/slideshow',
        component: SlideshowPage,
        name: 'slideshow-page',
      },
      {
        path: '/search',
        component: SearchPage,
        name: 'search-page',
      },
    ],
  })
}
