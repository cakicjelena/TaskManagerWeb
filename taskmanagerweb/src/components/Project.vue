<template>
  <div>
    <b-form>
      <b-list-group>
        <b-list-group-item
          v-onclick="goToTasks"
          v-for="value in data"
          :key="value.id"
        >
          <a href="#" @click="goToTasks()">{{ value.name }}</a>
        </b-list-group-item>
      </b-list-group>
    </b-form>
    <b-form>
      <b-button variant="info" @click="projectDetails" class="buttonClass"
        >PROJECT DETAILS</b-button
      >
      <b-button variant="info" @click="editProject" class="buttonClass"
        >EDIT PROJECT</b-button
      >
      <b-button variant="info" @click="deleteProject" class="buttonClass"
        >DELETE PROJECT</b-button
      >
      <b-button variant="info" @click="createProject" class="buttonClass"
        >CREATE PROJECT</b-button
      >
      <b-button variant="info" @click="putUserOnProject" class="buttonClass"
        >PUT USER ON PROJECT</b-button
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

<style>
.buttonClass {
  margin: 10px;
}
</style>
