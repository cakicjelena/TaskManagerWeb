<!--Component for Task Editing-->
<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-tasks"
        md-label="Tasks"
        name="Tasks"
        v-on:click="gototasks"
      ></md-tab>
    </md-tabs>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Edit Task</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="name">Name</label>
              <md-input
                name="name"
                id="name"
                v-model="form.name"
                :disabled="sending"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-datepicker v-model="form.finishDate">
              <label>Finish Date</label>
            </md-datepicker>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="description">Description</label>
              <md-input
                name="description"
                id="description"
                v-model="form.description"
                :disabled="sending"
              />
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label for="projectManagerId">User</label>
              <md-select v-model="form.user">
                <md-option
                  v-for="element in users"
                  v-bind:key="element.id"
                  :value="element.email"
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
            @click="taskedit"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { convert } from "@/utilities";
export default {
  name: "taskedit",
  data: () => ({
    form: {
      name: null,
      finishDate: null,
      description: null,
      user: null,
    },
    users: null,
    sending: false,
    data: null,
  }),
  async mounted() {
    this.initTaskEdit();
  },
  methods: {
    //Method for initialization TaskEdit component
    async initTaskEdit() {
      this.form.name = this.$store.task.name;
      this.form.finishDate = this.$store.task.finishDate;
      this.form.description = this.$store.task.description;
      this.form.user = this.$store.task.user;

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

    //Method for task editing

    async taskedit() {
      this.form.user = this.getIdByEmail(this.form.user);
      this.form.finishDate = convert(this.form.finishDate);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/edittask/" + this.$store.task.id,
        requestOptions
      );

      this.data = await response.json();
      alert("Successfully edited task!");
    },

    //Getting user id by user email

    getIdByEmail(email) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email == email) {
          return this.users[i].id;
        }
      }
      return null;
    },

    //Method that leads to Tasks page by clicking on navbar item

    async gototasks() {
      this.$router.push({ path: "/tasks", query: { ID: this.projectId } });
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
.md-layout {
  justify-content: center;
}
.md-tabs {
  background-color: #fac8ee;
}
</style>
