<!--Component for project creating-->

<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-projecs"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoprojects"
      ></md-tab>
    </md-tabs>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Project</div>
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
              <md-datepicker v-model="form.createDate">
                <label>Create Date</label>
              </md-datepicker>
            </div>
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
            @click="createproject"
            :disabled="sending"
            >Create project</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { convert } from "@/utilities";
export default {
  name: "ProjectCreate",
  data: () => ({
    form: {
      name: null,
      createDate: new Date(),
      deadlineDate: null,
      description: null,
      projectManagerId: null,
    },

    users: null,
    response: null,

    sending: false,
  }),
  async mounted() {
    this.initProjectCreate();
  },
  methods: {
    //Method for initialization of ProjectCreate component

    async initProjectCreate() {
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

    //Method for cleaning form fields

    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.createDate = null;
      this.form.deadlineDate = null;
      this.form.description = null;
      this.form.projectManagerId = null;
    },

    //Method for creating project

    async createproject() {
      this.form.createDate = convert(this.form.createDate);
      this.form.deadlineDate = convert(this.form.deadlineDate);
      this.loading = true;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/createproject/",
        requestOptions
      );

      this.response = await response.json();
      alert("Successfully created project!");
    },

    //Method that leads to project page by clicking on navbar item

    async gotoprojects() {
      this.$router.push({ name: "projects" });
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
