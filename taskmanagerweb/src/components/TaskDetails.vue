<template>
  <div>
    <md-tabs class="md-primary">
      <md-tab
        id="tab-tasks"
        md-label="tasks"
        name="Tasks"
        v-on:click="gototasks"
      ></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Task Details</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Name: {{ $route.params.name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Type: {{ $route.params.type }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Status: {{ $route.params.status }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Description: {{ $route.params.description }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Start date: {{ $route.params.startDate }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Finish Date: {{ $route.params.finishDate }}</md-table-cell
        >
      </md-table-row>
      <br />
    </md-table>
  </div>
</template>

<script>
export default {
  name: "TaskDetails",

  props: {
    name: String,
    type: String,
    status: String,
    description: String,
    startDate: Date,
    finishDate: Date,
  },
  components: {},
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async gototasks() {
        //vrati me na konkretne taskove
      //this.$router.push({ path: "/tasks" });
    },
  },
};
</script>
<style>
.profile-cell {
  text-align: justify;
}
md-tabs {
  color: #e1bee7;
}
</style>
