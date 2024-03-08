<template>
  <div class="mb-3">
    <b-form>
      <b-form-group>
        <label for="first_name">{{ "First name:" + first_name }} </label>
        <br />
        <label for="last_name">{{ "Last name:" + last_name }} </label>
        <br />
        <label for="email">{{ "Email:" + email }} </label>
        <br />
        <label for="sex">{{ "Sex:" + sex }} </label>
        <br />
        <label for="birthDate">{{ "Birth date:" + birthDate }} </label>
        <br />
        <label for="is_superuser">{{ "Admin:" + is_superuser }} </label>
      </b-form-group>

      <b-button variant="info" @click="projects">PROJECTS</b-button>
      <b-button variant="danger" @click="editProfile">EDIT PROFILE</b-button>
      <b-button variant="success" @click="logout">LOGOUT</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ProfileWidget",
  props: {
    first_name: String,
    last_name: String,
    email: String,
    sex: Number,
    birthDate: Date,
    is_superuser: Number,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async logout() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/logout/",
        requestOptions
      );
      this.data = await response.json();
      this.$router.push({ path: "/login" });
    },
    async projects() {
      this.$router.push({ path: "/projects" });
    },
    async editProfile() {},
  },
};
</script>
