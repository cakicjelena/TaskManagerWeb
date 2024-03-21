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
          >First name: {{ store.user.first_name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Last name: {{ store.user.last_name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Email: {{ store.user.email }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell" v-if="store.user.sex">
          Gender: Male</md-table-cell
        >
        <md-table-cell class="profile-cell" v-else>
          Gender: Female</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Birth date: {{ store.user.birthDate }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Admin: {{ store.user.is_superuser }}</md-table-cell
        >
      </md-table-row>
    </md-table>
    <br />
    <div id="buttondiv">
      <b-button variant="info" @click="editprofile">EDIT PROFILE</b-button>
      <br />
      <b-button variant="info" @click="logout">LOGOUT</b-button>
    </div>
  </div>
</template>

<script>
import { store } from "@/store";
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
      store,
    };
  },

  created() {
    if (
      store.user.id == null &&
      store.user.first_name == null &&
      store.user.last_name == null &&
      store.user.email == null &&
      store.user.sex == null &&
      store.user.birthDate == null &&
      store.user.is_superuser == null
    ) {
      store.user.id = this.$route.params.id;
      store.user.first_name = this.$route.params.first_name;
      store.user.last_name = this.$route.params.last_name;
      store.user.email = this.$route.params.email;
      store.user.sex = this.$route.params.sex;
      store.user.birthDate = this.$route.params.birthDate;
      store.user.is_superuser = this.$route.params.is_superuser;
    }
  },
  methods: {
    async logout() {
      store.user = null;
      store.project = null;
      store.task = null;
      store.allProjects = null;
      store.allUsers = null;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/logout/",
        requestOptions
      );
      this.data = await response.json();
      this.$router.push({ path: "/" });
    },
    async editprofile() {
      this.$router.push({
        name: "profileedit",
        params: {
          id: this.$route.params.id,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          sex: this.sex,
          birthDate: this.birthDate,
          password: null,
          cpassword: null,
          is_superuser: this.is_superuser,
        },
      });
    },
    async gotoprojects() {
      this.$router.push({ name: "projects" });
    },
    async gotousers() {
      this.$router.push({ path: "/users" });
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-cell {
  text-align: justify;
}
#buttondiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
