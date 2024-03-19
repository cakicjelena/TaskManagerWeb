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
          <div class="md-title">User on Project</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item">
            <md-field>
              <label for="projects">Project</label>
              <md-select v-model="projectId">
                <md-option
                  v-for="element in projects"
                  v-bind:key="element.id"
                  :value="element.id"
                  >{{ element.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field>
              <label for="users">User</label>
              <md-select v-model="userId">
                <md-option
                  v-for="element in users"
                  v-bind:key="element.id"
                  :value="element.id"
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
            >SUBMIT</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserOnProject",
  data: () => ({
    return: {
      data: null,
      userId: null,
      projectId: null,
      users: null,
      projects: null,
    },

    sending: false,
  }),
  async mounted() {
    const requestOptionsU = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const responseU = await fetch(
      "http://127.0.0.1:8000/getallusers/",
      requestOptionsU
    );

    this.users = await responseU.json();

    const requestOptionsP = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const responseP = await fetch(
      "http://127.0.0.1:8000/getallprojects/",
      requestOptionsP
    );

    this.projects = await responseP.json();
  },
  methods: {
    saveUser() {
      this.sending = true;
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
