<template>
  <div class="proj">
    <md-tabs>
      <md-tab
        id="tab-profile"
        md-label="Profile"
        name="Profile"
        v-on:click="gotoprofile"
      ></md-tab>
      <md-tab
        id="tab-projectcreate"
        md-label="Create new project"
        @click="createProject"
      ></md-tab>
      <md-tab
        id="tab-projectputuser"
        md-label="Put user on project"
        @click="putUserOnProject"
      ></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Projects</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head md-numeric>Name</md-table-head>
        <md-table-head md-numeric>Create Date</md-table-head>
        <md-table-head md-numeric>Deadline Date</md-table-head>
        <md-table-head md-numeric>Description</md-table-head>
        <md-table-head md-numeric>Project Manager ID</md-table-head>
      </md-table-row>
      <md-table-row v-for="(project, index) in data" :key="project.id">
        <md-table-cell md-numeric>{{ index }}</md-table-cell>
        <md-table-cell md-numeric>{{ project.name }}</md-table-cell>
        <md-table-cell md-numeric>{{ project.createDate }}</md-table-cell>
        <md-table-cell md-numeric>{{ project.deadlineDate }}</md-table-cell>
        <md-table-cell md-numeric>{{ project.description }}</md-table-cell>
        <md-table-cell md-numeric>{{ project.projectManagerId }}</md-table-cell>
      </md-table-row>
    </md-table>

    <b-form>
      <b-button variant="info" @click="editProject" class="buttonClass"
        >EDIT PROJECT</b-button
      >
      <b-button variant="info" @click="deleteProject" class="buttonClass"
        >DELETE PROJECT</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
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
      "http://127.0.0.1:8000/getallprojects/",
      requestOptions
    );
    this.data = await response.json();
  },
  name: "ProjectWidget",
  props: {
    msg: String,
  },
  methods: {
    async editProject() {},
    async deleteProject() {},
    async createProject() {},
    async putUserOnProject() {},
    async goToTasks() {
      this.$router.push({ path: "/tasks" });
    },
    async gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
  },
};
</script>

<style lang="scss">
.buttonClass {
  margin: 10px;
}
.proj {
  background-color: beige;
}
</style>
