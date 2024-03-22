<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Task</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
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
              <md-datepicker v-model="form.startDate">
                <label>Start Date</label>
              </md-datepicker>
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
                <label for="type">Type</label>
                <md-select v-model="form.type">
                  <md-option value="1">Ordinary</md-option>
                  <md-option value="2">Bug</md-option>
                  <md-option value="3">Urgent</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label for="status">Status</label>
                <md-select v-model="form.status">
                  <md-option value="1">To Do</md-option>
                  <md-option value="2">In Progress</md-option>
                  <md-option value="3">Done</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label for="user">User</label>
                <md-select v-model="form.userId">
                  <md-option
                    v-for="element in users"
                    v-bind:key="element.id"
                    :value="element.id"
                    >{{ element.email }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            @click="submit"
            >SUBMIT</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { convert } from "@/utilities";
export default {
  name: "TaskCreate",
  data: () => ({
    form: {
      name: null,
      startDate: new Date(),
      finishDate: null,
      description: null,
      status: null,
      type: null,
      userId: null,
      projectId: null,
    },
    users: null,

    sending: false,
  }),
  async mounted() {
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
  methods: {
    async submit() {
      this.form.startDate = convert(this.form.startDate);
      this.form.finishDate = convert(this.form.finishDate);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/createtask/" +
          this.$route.query.projectId +
          "/" +
          this.form.userId,
        requestOptions
      );

      this.response = await response.json();
      //this.loading = false;
      this.$router.push({ path: "/tasks", query: { ID: this.projectId } });
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.startDate = null;
      this.form.finishDate = null;
      this.form.description = null;
      this.form.status = null;
      this.form.type = null;
    },
    saveUser() {
      this.sending = true;

      this.clearForm();
    },
    async gototasks() {
      //vrati me na konkretne taskove
      //this.$router.push({ path: "/tasks" });
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
</style>
