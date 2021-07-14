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
    beforeEnter: requiresAuthentication,
    meta: {
      title: "Home || Playlisteer"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requiresNoAuthentication,
    meta: {
      title: "Login || Playlisteer"
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requiresNoAuthentication,
    meta: {
      title: "Signup || Playlisteer"
    }
  },
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requiresAuthentication,
    meta: {
      title: "Create a Playlist || Playlisteer"
    }
  },
  {
    path: '/playlist/:playlistId',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    props: true,
    beforeEnter: requiresAuthentication,
    meta: {
      title: "Playlist Info || Playlisteer"
    }
  },
  {
    path: '/user/playlists',
    name: 'UserPlaylists',
    component: UserPlaylists,
    beforeEnter: requiresAuthentication,
    meta: {
      title: "My Playlists || Playlisteer"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

export default router
