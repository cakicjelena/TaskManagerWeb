<!--Commponent for user profile view-->

<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-projecs"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoprojects"
      ></md-tab>
      <md-tab
        v-if="this.$session.get('is_superuser')"
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
          >First name: {{ this.$session.get("first_name") }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Last name: {{ this.$session.get("last_name") }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Email: {{ this.$session.get("email") }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell" v-if="this.$session.get('sex')">
          Gender: Male</md-table-cell
        >
        <md-table-cell class="profile-cell" v-else>
          Gender: Female</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Birth date: {{ this.$session.get("birthDate") }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Admin: {{ this.$session.get("is_superuser") }}</md-table-cell
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
  mounted() {
    this.initProfile();
  },
  methods: {
    //Method for profile initializaton

    initProfile() {
      if (
        this.$store.user.id == null ||
        this.$store.user.first_name == null ||
        this.$store.user.last_name == null ||
        this.$store.user.email == null ||
        this.$store.user.sex == null ||
        this.$store.user.birthDate == null ||
        this.$store.user.is_superuser == null
      ) {
        this.$store.user.id = this.$session.get("id");
        this.$store.user.first_name = this.$session.get("first_name");
        this.$store.user.last_name = this.$session.get("last_name");
        this.$store.user.email = this.$session.get("email");
        this.$store.user.sex = this.$session.get("sex");
        this.$store.user.birthDate = this.$session.get("birthDate");
        this.$store.user.is_superuser = this.$session.get("is_superuser");
      }
    },

    //Method for loging out

    async logout() {
      this.$store.user = null;
      this.$store.project = null;
      this.$store.task = null;
      this.$store.allProjects = null;
      this.$store.allUsers = null;
      this.$session.destroy();
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
      this.$router.go();
    },

    //Method that leads to Profile Edit page by clicking on Edit profile button

    async editprofile() {
      this.$router.push({
        name: "profileedit",
      });
    },

    //Method that leads to list of projects page by clicking on navbar item

    async gotoprojects() {
      this.$router.push({ name: "projects" });
    },

    //Method that leads to list of users page by clicking on navbar item

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
.md-tabs {
  background-color: #fac8ee;
}
</style>
