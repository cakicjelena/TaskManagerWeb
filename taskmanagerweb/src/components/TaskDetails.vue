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
          >Name: {{ $route.query.name }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Type: {{ $route.query.type }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Status: {{ $route.query.status }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Description: {{ $route.query.description }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Start date: {{ $route.query.startDate }}</md-table-cell
        >
      </md-table-row>
      <md-table-row>
        <md-table-cell class="profile-cell"
          >Finish Date: {{ $route.query.finishDate }}</md-table-cell
        >
      </md-table-row>
    </md-table>
    <md-table v-model="comments" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Comments</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Email" md-sort-by="email">{{
          item.email
        }}</md-table-cell>
        <md-table-cell md-label="Comment" md-sort-by="comment">{{
          item.comment
        }}</md-table-cell>
      </md-table-row>
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
      comments: null,

      taskname: null,
      tasktype: null,
      taskstatus: null,
      taskdescription: null,
      taskstartDate: null,
      taskfinishDate: null,
    };
  },
  async mounted() {
    alert(this.taskname);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/getallcommentsoftask/",
      requestOptions
    );
    this.data = await response.json();
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
