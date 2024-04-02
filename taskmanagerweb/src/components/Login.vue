<!--This component is for user login-->

<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img src="../../public/logo.jpg" />
        <div class="md-title">Task Manager</div>
      </div>
      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center">
        <md-button id="login" class="md-raised md-primary" @click="login"
          >Log in</md-button
        >
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: "LoginWdiget",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      loading: false,
      data: null,
    };
  },

  methods: {
    //Method for login

    async login() {
      this.loading = true;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/login/",
        requestOptions
      );
      this.data = await response.json();
      if (response.status == 400) alert("Wrong email or password!");
      else {
        this.$session.start();
        this.$store.user.id = this.data["id"];
        this.$store.user.first_name = this.data["first_name"];
        this.$store.user.last_name = this.data["last_name"];
        this.$store.user.email = this.data["email"];
        this.$store.user.sex = this.data["sex"];
        this.$store.user.birthDate = this.data["birthDate"];
        this.$store.user.is_superuser = this.data["is_superuser"];
        this.$session.set("id", this.$store.user.id);
        this.$session.set("first_name", this.$store.user.first_name);
        this.$session.set("last_name", this.$store.user.last_name);
        this.$session.set("email", this.$store.user.email);
        this.$session.set("sex", this.$store.user.sex);
        this.$session.set("birthDate", this.$store.user.birthDate);
        this.$session.set("is_superuser", this.$store.user.is_superuser);
        this.$router.push({
          name: "profile",
        });
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }

  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #login {
    background-color: blueviolet;
  }
}
</style>
