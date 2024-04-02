<!--Component for adding user on project-->
<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-project"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoproject"
      ></md-tab>
    </md-tabs>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">User on Project</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item">
            <md-field>
              <label for="projects">Project</label>
              <md-select v-model="form.project_id">
                <md-option
                  v-for="element in projects"
                  v-bind:key="element.id"
                  :value="element.id"
                  >{{ element.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field>
              <label for="users">User</label>
              <md-select v-model="form.user_id">
                <md-option
                  v-for="element in users"
                  v-bind:key="element.id"
                  :value="element.id"
                  >{{ element.email }}</md-option
                >
              </md-select>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            @click="put"
            >SUBMIT</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserOnProject",
  data: () => ({
    form: {
      user_id: null,
      project_id: null,
    },
    data: null,
    users: null,
    projects: null,

    sending: false,
  }),
  async mounted() {
    this.initUserOnProject();
  },
  methods: {
    //Method for initialization UserOnProject component

    async initUserOnProject() {
      if (this.$store.allUsers == null) {
        const requestOptionsU = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        const responseU = await fetch(
          "http://127.0.0.1:8000/getallusers/",
          requestOptionsU
        );

        this.users = await responseU.json();
        this.$store.allUsers = this.users;
      } else {
        this.users = this.$store.allUsers;
      }
      if (this.$store.allProjects == null) {
        const requestOptionsP = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        const responseP = await fetch(
          "http://127.0.0.1:8000/getallprojects/",
          requestOptionsP
        );

        this.projects = await responseP.json();
        this.$store.allProjects = this.projects;
      } else {
        this.projects = this.$store.allProjects;
      }
    },

    //Method that leads to Projects page by clicking on navbar item

    async gotoproject() {
      this.$router.push({ path: "/projects" });
    },

    //Adding selected user on selected project

    async put() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/createuseronproject/" +
          this.form.user_id +
          "/" +
          this.form.project_id,
        requestOptions
      );

      this.response = await response.json();
      alert("Successfully added user on project!");
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-tabs {
  background-color: #fac8ee;
}
.md-layout {
  justify-content: center;
}
</style>
