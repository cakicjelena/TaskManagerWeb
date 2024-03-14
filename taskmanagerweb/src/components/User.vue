<template>
  <div>
    <md-tabs class="md-primary">
      <md-tab
        id="tab-profile"
        md-label="Profile"
        name="Profile"
        v-on:click="gotoprofile"
      ></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head md-numeric>First Name</md-table-head>
        <md-table-head md-numeric>Last Name</md-table-head>
        <md-table-head md-numeric>Email</md-table-head>
        <md-table-head md-numeric>Gender</md-table-head>
        <md-table-head md-numeric>Birth Date</md-table-head>
        <md-table-head md-numeric>Admin</md-table-head>
      </md-table-row>
      <md-table-row v-for="user in data" :key="user.id">
        <md-table-cell md-numeric>{{ user.id }}</md-table-cell>
        <md-table-cell md-numeric>{{ user.first_name }}</md-table-cell>
        <md-table-cell md-numeric>{{ user.last_name }}</md-table-cell>
        <md-table-cell md-numeric>{{ user.email }}</md-table-cell>
        <md-table-cell md-numeric v-if="user.sex">Male </md-table-cell>
        <md-table-cell md-numeric v-else> Female </md-table-cell>
        <md-table-cell md-numeric>{{ user.birthDate }}</md-table-cell>
        <md-table-cell md-numeric>{{ user.is_superuser }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "UserWidget",
  props: {
    msg: String,
  },
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/getallusers/",
      requestOptions
    );
    this.data = await response.json();
  },
  methods: {
    gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
  },
};
</script>
