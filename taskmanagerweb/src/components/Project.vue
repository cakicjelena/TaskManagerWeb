<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-profile"
        md-label="Profile"
        name="Profile"
        v-on:click="gotoprofile"
      ></md-tab>
      <md-tab
        v-if="this.$store.user.is_superuser"
        id="tab-projectcreate"
        md-label="New project"
        @click="createProject"
      ></md-tab>
      <md-tab
        v-if="this.$store.user.is_superuser"
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
      <b-button
        v-if="this.$store.user.is_superuser"
        variant="info"
        @click="editProjectButton"
        class="buttonClass"
        >EDIT PROJECT</b-button
      >
      <b-button
        v-if="this.$store.user.is_superuser"
        variant="info"
        @click="deleteProject"
        class="buttonClass"
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
      users: null,
      deleteresponse: null,
      usersOnProject: null,
    };
  },
  async created() {
    var adminUrl = "http://127.0.0.1:8000/getallprojects/";
    var userUrl =
      "http://127.0.0.1:8000/getallprojectsofuser/" + this.$session.get("id");
    var currentUrl = "";
    if (this.$store.user.is_superuser) {
      currentUrl = adminUrl;
    } else {
      currentUrl = userUrl;
    }
    if (this.$store.allProjects == null) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(currentUrl, requestOptions);
      this.data = await response.json();
      this.$store.allProjects = this.data;
    } else {
      this.data = this.$store.allProjects;
    }

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
      this.$store.project.id = this.selected.id;
      this.$store.project.name = this.selected.name;
      this.$store.project.createDate = this.selected.createDate;
      this.$store.project.deadlineDate = this.selected.deadlineDate;
      this.$store.project.description = this.selected.description;
      this.$store.project.projectManagerId = this.selected.projectManagerId;
      this.$store.project.users = this.users;
      this.$session.set("projectid", this.$store.project.id);
      this.$session.set("name", this.$store.project.name);
      this.$session.set("createDate", this.$store.project.createDate);
      this.$session.set("deadlineDate", this.$store.project.deadlineDate);
      this.$session.set("description", this.$store.project.description);
      this.$session.set(
        "projectManagerId",
        this.$store.project.projectManagerId
      );
      this.$session.set("users", this.$store.project.users);
    },
    async editProjectButton() {
      if (this.selected == null) {
        alert("You must select project!");
      } else {
        this.$router.push({
          name: "projectedit",
        });
      }
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
      this.$session.set("projectid", this.$store.project.id);
      this.$session.set("name", this.$store.project.name);
      this.$session.set("createDate", this.$store.project.createDate);
      this.$session.set("deadlineDate", this.$store.project.deadlineDate);
      this.$session.set("description", this.$store.project.description);
      this.$session.set(
        "projectManagerId",
        this.$store.project.projectManagerId
      );
      this.$session.set("users", this.$store.project.users);
      this.$router.push({
        path: "/tasks/",
      });
    },
    async gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
    findUserById(ID) {
      if (this.users != null) {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id == ID) {
            return this.users[i].email;
          }
        }
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
.buttonClass {
  margin: 10px;
}
.md-tabs {
  background-color: #fac8ee;
}
</style>
