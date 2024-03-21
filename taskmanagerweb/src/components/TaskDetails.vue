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
            >Name: {{ store.task.name }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell" v-if="store.task.type == 1"
            >Type: Ordinary
          </md-table-cell>
          <md-table-cell class="profile-cell" v-else-if="store.task.type == 2"
            >Type: Bug
          </md-table-cell>
          <md-table-cell class="profile-cell" v-else
            >Type: Urgent
          </md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell" v-if="store.task.status == 1"
            >Status: To Do</md-table-cell
          >
          <md-table-cell class="profile-cell" v-else-if="store.task.status == 2"
            >Status: In Progress</md-table-cell
          >
          <md-table-cell class="profile-cell" v-else
            >Status: Done</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Description: {{ store.task.description }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Start date: {{ store.task.startDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >Finish Date: {{ store.task.finishDate }}</md-table-cell
          >
        </md-table-row>
        <md-table-row>
          <md-table-cell class="profile-cell"
            >User: {{ findUserById(store.task.userTask) }}</md-table-cell
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
import { store } from "@/store";

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
      taskId: store.task.id,
      taskname: store.task.name,
      tasktype: null,
      taskstatus: null,
      taskdescription: store.task.description,
      taskstartDate: null,
      taskfinishDate: store.task.finishDate,
      userId: store.task.userTask,
      users: null,
      store,
      response: null,
    };
  },
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/getallcommentsoftask/" + store.task.id,
      requestOptions
    );
    this.comments = await response.json();
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
          store.user.id +
          "/" +
          store.task.id,
        requestOptions
      );

      this.response = await response.json();
      //this.loading = false;
      //this.$router.go();
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
