<template>
  <div>
    <md-tabs class="md-primary">
      <md-tab
        id="tab-project"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoproject"
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
                    v-for="element in data"
                    v-bind:key="element.id"
                    :value="element.first_name"
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
            >Create project</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProjectCreate",
  data: () => ({
    form: {
      name: null,
      createDate: null,
      deadlineDate: null,
      description: null,
      projectManagerId: null,
      projectManagerEmail: null,
    },

    sending: false,
  }),
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      "http://127.0.0.1:8000/getallusers/",
      requestOptions
    );

    this.data = await response.json();
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.createDate = null;
      this.form.deadlineDate = null;
      this.form.description = null;
      this.form.projectManagerId = null;
    },
    saveUser() {
      this.sending = true;

      this.clearForm();
    },
    async gotoproject() {
      this.$router.push({ path: "/projects" });
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
