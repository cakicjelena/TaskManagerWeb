<template>
  <div>
    <md-tabs class="md-primary">
      <md-tab
        id="tab-profile"
        md-label="Profile"
        name="Profile"
        v-on:click="gotoprofile"
      ></md-tab>
      <md-tab
        id="tab-projectcreate"
        md-label="New project"
        @click="createProject"
      ></md-tab>
      <md-tab
        id="tab-projectputuser"
        md-label="Put user on project"
        @click="putUserOnProject"
      ></md-tab>
    </md-tabs>
    <md-table v-model="data" md-card @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        :class="getClass(item)"
        md-selectable="single"
        @dblclick="goToTasks()"
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
          item.id
        }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name" md-numeric>
          {{ item.name }}</md-table-cell
        >
        <md-table-cell
          md-label="Create Date"
          md-sort-by="createDate"
          md-numeric
          >{{ item.createDate }}</md-table-cell
        >
        <md-table-cell
          md-label="Deadline Date"
          md-sort-by="deadlineDate"
          md-numeric
          >{{ item.deadlineDate }}</md-table-cell
        >
        <md-table-cell
          md-label="Description"
          md-sort-by="description"
          md-numeric
          >{{ item.description }}</md-table-cell
        >
        <md-table-cell
          md-label="Project Manager"
          md-sort-by="projectManagerId"
          md-numeric
          >{{ findUserById(item.projectManagerId) }}</md-table-cell
        >
        <md-table-cell md-label="Users"
          ><md-select
            ><md-option
              v-for="element in item.users"
              v-bind:key="element.id"
              :value="element.id"
              >{{ element.email }}</md-option
            >
          </md-select>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <b-form>
      <b-button variant="info" @click="editProjectButton" class="buttonClass"
        >EDIT PROJECT</b-button
      >
      <b-button variant="info" @click="deleteProject" class="buttonClass"
        >DELETE PROJECT</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { store } from "@/store";
export default {
  data() {
    return {
      data: null,
      users: null,
      deleteresponse: null,
      usersOnProject: null,
      store,
    };
  },
  async created() {
    if (store.allProjects == null) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/getallprojects/",
        requestOptions
      );
      this.data = await response.json();
      store.allProjects = this.data;
    } else {
      this.data = store.allProjects;
    }

    if (store.allUsers == null) {
      const requestOptionsU = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const responseU = await fetch(
        "http://127.0.0.1:8000/getallusers/",
        requestOptionsU
      );
      this.users = await responseU.json();
      store.allUsers = this.users;
    } else {
      this.users = store.allUsers;
    }
  },
  name: "ProjectWidget",
  props: {
    msg: String,
  },
  methods: {
    getClass: ({ id }) => ({
      "md-primary": id === 2,
      "md-accent": id === 3,
    }),
    onSelect(item) {
      this.selected = item;
      store.project.id = this.selected.id;
      store.project.name = this.selected.name;
      store.project.createDate = this.selected.createDate;
      store.project.deadlineDate = this.selected.deadlineDate;
      store.project.description = this.selected.description;
      store.project.projectManagerId = this.selected.projectManagerId;
      store.project.users = this.users;
    },
    async editProjectButton() {
      this.$router.push({
        name: "projectedit",
        params: {
          id: this.selected.id,
          name: this.selected.name,
          createDate: this.selected.createDate,
          deadlineDate: this.selected.deadlineDate,
          description: this.selected.description,
          projectManagerId: this.selected.projectManagerId,
          users: this.users,
        },
      });
    },
    async deleteProject() {
      if (this.selected == null) {
        alert("You must select project!");
      } else {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          "http://127.0.0.1:8000/deleteproject/" + this.selected.id,
          requestOptions
        );
        this.deleteresponse = await response.json();
        this.$router.go();
      }
    },
    async createProject() {
      this.$router.push({ path: "/projectcreate" });
    },
    async putUserOnProject() {
      this.$router.push({ path: "/useronproject" });
    },
    goToTasks() {
      this.$router.push({
        path: "/tasks/",
      });
    },
    async gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
    findUserById(ID) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == ID) {
          return this.users[i].email;
        }
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
.buttonClass {
  margin: 10px;
}
</style>
