<template>
  <div>
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
import { store } from "@/store";
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
    store,
  }),
  async mounted() {
    this.form.name = store.task.name;
    this.form.finishDate = store.task.finishDate;
    this.form.description = store.task.description;
    this.form.user = store.task.user;

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
  methods: {
    async taskedit() {
      this.form.user = this.getIdByEmail(this.form.user);
      this.form.finishDate = convert(this.form.finishDate);
      alert(this.form.user);
      this.loading = true;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/edittask/" + store.task.id,
        requestOptions
      );

      this.data = await response.json();
      //this.loading = false;
      this.$router.push({ path: "/tasks" });
    },
    getIdByEmail(email) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email == email) {
          return this.users[i].id;
        }
      }
      return null;
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
