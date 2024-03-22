<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Edit Project</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item md-small-size-100">
            <md-datepicker v-model="form.deadlineDate">
              <label>Deadline Date</label>
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
              <label for="projectManagerId">Project Manager</label>
              <md-select v-model="form.projectManagerId">
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
            @click="projectedit"
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
  name: "projectedit",
  data: () => ({
    form: {
      name: null,
      createDate: null,
      deadlineDate: null,
      description: null,
      projectManagerId: null,
    },
    users: null,
    sending: false,
    data: null,
  }),
  async mounted() {
    this.form.name = this.$session.get("name");
    this.form.createDate = this.$session.get("createDate");
    this.form.deadlineDate = this.$session.get("deadlineDate");
    this.form.description = this.$session.get("description");
    this.form.projectManagerId = this.$session.get("projectManagerId");
    this.users = this.$session.get("users");
  },
  methods: {
    async projectedit() {
      this.form.deadlineDate = convert(this.form.deadlineDate);
      this.form.projectManagerId = this.getIdByEmail(
        this.form.projectManagerId
      );
      alert(this.form.projectManagerId);
      this.loading = true;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/editproject/" + this.$session.get("projectid"),
        requestOptions
      );

      this.data = await response.json();
      //this.loading = false;
      this.$router.push({ path: "/project" });
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
