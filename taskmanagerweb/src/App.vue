import { MdTabs } from 'vue-material';
<template>
  <div id="app" class="background">
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/registration">Sign up</router-link>
    </nav>
    <router-view />
    <div class="centered-container">
      <md-content class="md-elevation-3">
        <div class="title">
          <img
            src="https://pbs.twimg.com/profile_images/126815649/logo_square_400x400.png"
          />
          <div class="md-title">Task Manager</div>
          <div class="md-body-1">System for managing tasks</div>
        </div>
      </md-content>
    </div>
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
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.background {
  background: url(https://img.freepik.com/free-photo/abstract-smoke-wallpaper-background-desktop_53876-133380.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1710115200&semt=ais);
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
