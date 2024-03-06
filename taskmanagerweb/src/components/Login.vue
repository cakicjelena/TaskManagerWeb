<template>
  <div class="col-md-6" id="loginform">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          :value="email"
          @input="(event) => (email = event.target.value)"
          v-model="email"
          id="input-1"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <label for="text-password">Password:</label>
      <b-form-input
        :value="password"
        @input="(event) => (password = event.target.value)"
        v-model="password"
        type="password"
        placeholder="Enter password"
        id="text-password"
        aria-describedby="password-help-block"
      ></b-form-input>
    </b-form>
    <b-button variant="success" @click="login">Submit</b-button>
    <br />
    <b-button variant="primary">Sign in</b-button>
  </div>
</template>

<script>
export default {
  name: "LoginWdiget",
  props: {
    msg: String,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async login() {
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
      this.$router.push({ path: "/profile", props: { first_name: "Jelena" } });
    },
  },
};
</script>

<style>
#loginform {
  text-align: center;
}
</style>
