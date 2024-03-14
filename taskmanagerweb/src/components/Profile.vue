<template>
  <div>
    <md-tabs class="md-primary">
      <md-tab
        id="tab-projecs"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoprojects"
      ></md-tab>
      <md-tab
        id="tab-users"
        md-label="Users"
        name="Users"
        v-on:click="gotousers"
      ></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Profile</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >First name: {{ $route.params.first_name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Last name: {{ $route.params.last_name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Email: {{ $route.params.email }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell" v-if="$route.params.sex">
          Gender: Male</md-table-cell
        >
        <md-table-cell class="profile-cell" v-else>
          Gender: Female</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Birth date: {{ $route.params.birthDate }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Admin: {{ $route.params.is_superuser }}</md-table-cell
        >
      </md-table-row>
      <br />
    </md-table>

    <b-button variant="success" @click="logout">LOGOUT</b-button>
  </div>
</template>

<script>
//import BarWidget from "@/components/Bar.vue";
export default {
  name: "ProfileWidget",

  props: {
    first_name: String,
    last_name: String,
    email: String,
    sex: Boolean,
    birthDate: Date,
    is_superuser: Boolean,
  },
  components: {
    // BarWidget,
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
      this.$router.push({ name: "login" });
    },
    async editProfile() {},
    async gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
    async gotoprojects() {
      this.$router.push({ path: "/projects" });
    },
    async gotousers() {
      this.$router.push({ path: "/users" });
    },
  },
};
</script>
<style>
.profile-cell {
  text-align: justify;
}
md-tabs {
  color: #e1bee7;
}
</style>
