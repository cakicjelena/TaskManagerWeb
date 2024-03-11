<template>
  <div class="proj">
    <md-tabs>
      <md-tab
        id="tab-projectdetails"
        md-label="Project details"
        @click="projectDetails"
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
    <md-table>
      <md-table-row> </md-table-row>
      <md-table-row v-onclick="goToTasks" v-for="value in data" :key="value.id">
        <md-table-cell>
          <a href="#" @click="goToTasks()">{{ value.name }}</a>
        </md-table-cell>
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
  name: "ProjectWidget",
  props: {
    msg: String,
  },
  data() {
    return {
      data: [
        {
          name: "TaskManager",
          createDate: "2024-03-08",
          deadlineDate: "2024-06-08",
          desciption: "Nesto",
          projectManagerId: "1",
        },
        {
          name: "SearchInfo",
          createDate: "2024-03-08",
          deadlineDate: "2024-06-08",
          desciption: "Nesto",
          projectManagerId: "1",
        },
      ],
    };
  },
  methods: {
    async projectDetails() {},
    async editProject() {},
    async deleteProject() {},
    async createProject() {},
    async putUserOnProject() {},
    async goToTasks() {
      this.$router.push({ path: "/tasks" });
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
