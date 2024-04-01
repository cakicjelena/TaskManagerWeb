<template>
  <div>
    <md-tabs class="md-transparent">
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
            >Name: {{ this.$store.task.name }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell" v-if="this.$store.task.type == 1"
            >Type: Ordinary
          </md-table-cell>
          <md-table-cell
            class="profile-cell"
            v-else-if="this.$store.task.type == 2"
            >Type: Bug
          </md-table-cell>
          <md-table-cell class="profile-cell" v-else
            >Type: Urgent
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell
            class="profile-cell"
            v-if="this.$store.task.status == 1"
            >Status: To Do</md-table-cell
          >
          <md-table-cell
            class="profile-cell"
            v-else-if="this.$store.task.status == 2"
            >Status: In Progress</md-table-cell
          >
          <md-table-cell class="profile-cell" v-else
            >Status: Done</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Description: {{ this.$store.task.description }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Start date: {{ this.$store.task.startDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Finish Date: {{ this.$store.task.finishDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >User: {{ findUserById(this.$store.task.userTask) }}</md-table-cell
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
      taskId: this.$store.task.id,
      taskname: this.$store.task.name,
      tasktype: null,
      taskstatus: null,
      taskdescription: this.$store.task.description,
      taskstartDate: null,
      taskfinishDate: this.$store.task.finishDate,
      userId: this.$store.task.userTask,
      users: null,
      response: null,
    };
  },
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/getallcommentsoftask/" +
        this.$session.get("taskId"),
      requestOptions
    );
    this.comments = await response.json();
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
    //kako da se automatski doda komentar kad se klikne na dugme??
    async leaveComment() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ comment: this.comment }),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/createcommentontask/" +
          this.$session.get("id") +
          "/" +
          this.$session.get("taskId"),
        requestOptions
      );

      this.response = await response.json();
      //this.loading = false;
      this.$router.go();
    },
    async gototasks() {
      this.$router.push({ path: "/tasks", query: { ID: this.projectId } });
    },
  },
};
</script>
<style>
.profile-cell {
  text-align: justify;
}
.md-tabs {
  background-color: #fac8ee;
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
