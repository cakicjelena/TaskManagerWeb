import { MdTabs } from 'vue-material';
<template>
  <div id="app" class="background">
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/registration">Sign up</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 60px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 25px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.background {
  background: url("../public/background.jpg");
  position: absolute;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 200vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 600px;
    position: relative;
  }
}
</style>
