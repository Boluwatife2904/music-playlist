<template>
  <div class="navbar">
    <nav>
      <div class="logo">
        <router-link :to="{ name: 'Home' }">Musico</router-link>
      </div>
      <ul class="navigation-links">
        <li class="navigation-item" v-if="!user">
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li class="navigation-item" v-if="!user">
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
        </li>
        <li class="navigation-item" v-if="user">
          <button @click="logoutUser">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import logoutAction from "@/composables/logoutAction.js";
import getUser from "@/composables/getCurrentUser.js";
export default {
  name: "TheNavbar",
  setup() {
    const router = useRouter();
    const { user } = getUser();
    const { error, logout } = logoutAction();

    const logoutUser = async () => {
      await logout();
      if (!error.value) {
        console.log("User signed out successfully");
        router.push({ name: "Login" });
      }
    };

    return { logoutUser, user };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  margin-bottom: 60px;
  background: #fff;

  nav {
    padding: 20px 10px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      list-style: none;

      li {
        display: inline-block;
        margin-left: 20px;

        a,
        button {
          margin: 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>