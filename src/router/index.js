import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../views/auth/Login.vue"
import Signup from "../views/auth/Signup.vue"
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue"
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue"
import UserPlaylists from "../views/playlists/UserPlaylists.vue"

// ROute guards
import { projectAuth } from "@/firebase/config";

const requiresAuthentication = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user) {
    next({ name: 'Login' })
  } else {
    next();
  }
}

const requiresNoAuthentication = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(user) {
    next({ name: 'Home' })
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requiresAuthentication
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requiresNoAuthentication
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requiresNoAuthentication
  },
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requiresAuthentication
  },
  {
    path: '/playlist/:playlistId',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    props: true,
    beforeEnter: requiresAuthentication
  },
  {
    path: '/user/playlists',
    name: 'UserPlaylists',
    component: UserPlaylists,
    beforeEnter: requiresAuthentication
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
