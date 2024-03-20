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
    <div class="ceo-div">
      <md-table md-card class="tabela">
        <md-table-toolbar>
          <h1 class="md-title">Task Details</h1>
        </md-table-toolbar>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Name: {{ this.$route.query.name }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell" v-if="this.$route.query.type == 1"
            >Type: Ordinary
          </md-table-cell>
          <md-table-cell
            class="profile-cell"
            v-else-if="this.$route.query.type == 2"
            >Type: Bug
          </md-table-cell>
          <md-table-cell class="profile-cell" v-else
            >Type: Urgent
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell
            class="profile-cell"
            v-if="this.$route.query.status == 1"
            >Status: To Do</md-table-cell
          >
          <md-table-cell
            class="profile-cell"
            v-else-if="this.$route.query.status == 2"
            >Status: In Progress</md-table-cell
          >
          <md-table-cell class="profile-cell" v-else
            >Status: Done</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Description: {{ this.$route.query.description }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Start date: {{ this.$route.query.startDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Finish Date: {{ this.$route.query.finishDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >User: {{ findUserById(this.$route.query.userId) }}</md-table-cell
          >
        </md-table-row>
      </md-table>
      <md-table v-model="comments" md-card class="tabela">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Email" md-sort-by="email">{{
            item.email
          }}</md-table-cell>
          <md-table-cell md-label="Comment" md-sort-by="comment">{{
            item.comment
          }}</md-table-cell>
        </md-table-row>
      </md-table>
      <div class="tabela">
        <md-field>
          <label>Comment</label>
          <md-textarea v-model="comment"></md-textarea>
        </md-field>
      </div>
      <b-form>
        <b-button variant="info" @click="leaveComment" class="buttonClass"
          >Leave Comment</b-button
        >
        <b-button
          variant="info"
          @click="
            editTask(taskId, taskname, taskdescription, taskfinishDate, userId)
          "
          class="buttonClass"
          >Edit Task</b-button
        ></b-form
      >
      <br />
    </div>
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
      taskId: this.$route.query.id,
      taskname: this.$route.query.name,
      tasktype: null,
      taskstatus: null,
      taskdescription: this.$route.query.description,
      taskstartDate: null,
      taskfinishDate: this.$route.query.finishDate,
      userId: this.$route.query.userId,
      users: null,
    };
  },
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/getallcommentsoftask/" + this.$route.query.id,
      requestOptions
    );
    this.comments = await response.json();

    const requestOptionsU = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const responseU = await fetch(
      "http://127.0.0.1:8000/getallusers/",
      requestOptionsU
    );
    this.users = await responseU.json();
  },
  methods: {
    async gototasks() {
      this.$router.back();
    },
    editTask(ID, name, desc, finDate, u) {
      this.$router.push({
        path: "/taskedit",
        query: {
          id: ID,
          name: name,
          description: desc,
          finishDate: finDate,
          user: u,
        },
      });
    },
    findUserById(ID) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == ID) {
          return this.users[i].email;
        }
      }
      return null;
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
.ceo-div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tabela {
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  background-color: white;
}
</style>
