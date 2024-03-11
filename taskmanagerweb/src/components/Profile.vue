<template>
  <div>
    <md-tabs>
      <md-tab id="tab-projects" md-label="Projects" @click="projects"></md-tab>
      <md-tab id="tab-users" md-label="Users"></md-tab>
      <md-tab
        id="tab-edit"
        md-label="Edit profile"
        @click="editProfile"
      ></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Profile</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-cell class="profile-cell">First name:</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell">Last name:</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell">Email:</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell">Gender:</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell">Birth date:</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell">Admin:</md-table-cell>
      </md-table-row>
    </md-table>

    <b-button variant="success" @click="logout">LOGOUT</b-button>
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
<style>
.profile-cell {
  text-align: justify;
}
</style>
