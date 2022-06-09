import { createRouter, createWebHistory } from 'vue-router'
import TheHeader from '~/components/TheHeader.vue'
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'
import AboutName from './AboutName.vue'
import NotFound from './NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      name: 'mainpage',
      path: '/',
      components: {
        TheHeader,
        default: Home
      }
    },
    {
      path: '/movies/:sun',
      components: { 
        default: Movie,
        TheHeader
      }
    },
    {
      path: '/about',
      meta:{ auth: true },
      component: About,
      children: [
        {
          path: 'name',
          component: AboutName
        }
      ]
    },
    {
      path: '/:notFound(.*)*',
      component: NotFound
    }
  ]
})
