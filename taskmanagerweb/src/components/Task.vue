<!--Component for tasks-->
<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-project"
        md-label="Projects"
        name="Projects"
        v-on:click="gotoprojects"
      ></md-tab>
      <md-tab
        id="tab-taskCreate"
        md-label="Create task"
        name="Create Task"
        v-on:click="gototaskcreate"
      ></md-tab>
    </md-tabs>
    <br />
    <div class="row">
      <div class="col-3">
        <h3>TO DO</h3>
        <draggable
          class="list-group"
          :list="this.list1"
          group="tasks"
          @change="log1"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element.id"
            @dblclick="gototaskdetails(element)"
            @click="take(element)"
            :id="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="col-3">
        <h3>IN PROGRESS</h3>
        <draggable
          class="list-group"
          :list="this.list2"
          group="tasks"
          @change="log2"
        >
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.id"
            @dblclick="gototaskdetails(element)"
            @click="take(element)"
            :id="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>

      <div class="col-3">
        <h3>DONE</h3>
        <draggable
          class="list-group"
          :list="this.list3"
          group="tasks"
          @change="log3"
        >
          <div
            class="list-group-item"
            v-for="element in list3"
            :key="element.id"
            @dblclick="gototaskdetails(element)"
            @click="take(element)"
            :id="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
    <br />
    <br />
    <b-button variant="info" @click="taskdelete" class="buttonClass"
      >Delete task</b-button
    >
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "three-lists",
  display: "Three Lists",
  order: 1,
  props: {
    msg: String,
  },
  components: {
    draggable,
  },
  data() {
    return {
      data: null,
      list1: [],
      list2: [],
      list3: [],
      projectId: null,
      selected: null,
      clicked: false,
      backColor: "white",
      deleteresponse: null,
      userId: null,
      changeresponse: null,
    };
  },
  async mounted() {
    this.initTask();
  },
  methods: {
    //Method for initialization of task component

    async initTask() {
      var userUrl =
        "http://127.0.0.1:8000/getalltasksofuser/" + this.$session.get("id");
      var adminUrl =
        "http://127.0.0.1:8000/getalltasksofproject/" +
        this.$session.get("projectid");
      var currentUrl = "";
      if (this.$session.get('is_superuser')) {
        currentUrl = adminUrl;
      } else {
        currentUrl = userUrl;
      }
      this.projectId = this.$store.project.id;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(currentUrl, requestOptions);

      this.data = await response.json();
      this.initTasks();
    },

    //Method that leads to taskdetails page by doubleclicking on task

    gototaskdetails(task) {
      this.$store.task.id = task.id;
      this.$store.task.name = task.name;
      this.$store.task.type = task.type;
      this.$store.task.status = task.status;
      this.$store.task.description = task.description;
      this.$store.task.startDate = task.startDate;
      this.$store.task.finishDate = task.finishDate;
      this.$store.task.userTask = task.user;
      this.$session.set("taskId", task.id);
      this.$router.push({
        name: "taskdetails",
      });
    },

    //Method that leads to project page by clicking on navbar item

    gotoprojects() {
      this.$router.push({ path: "/projects" });
    },

    //Method that leads to taskCreate page by clicking on navbar item

    gototaskcreate() {
      this.$router.push({
        path: "/taskcreate",
        query: { projectId: this.projectId },
      });
    },

    //Deleting selected task by clicking on button

    async taskdelete() {
      if (this.selected == null) {
        alert("You must select task!");
      } else {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          "http://127.0.0.1:8000/deletetask/" + this.selected.id,
          requestOptions
        );
        this.deleteresponse = await response.json();
        this.$router.go();
      }
    },

    //Function called when item on TO DO list is added

    log1: function (evt) {
      console.log("1");
      if (evt.added != null) {
        this.changeTaskStatus(evt.added.element.id, 1);
      }
      console.log(evt);
    },

    //Function called when item on IN PROGRESS list is added

    log2: function (evt) {
      console.log("2");
      if (evt.added != null) {
        this.changeTaskStatus(evt.added.element.id, 2);
      }
      console.log(evt);
    },

    //Function called when item on DONE list is added

    log3: function (evt) {
      console.log("3");
      if (evt.added != null) {
        this.changeTaskStatus(evt.added.element.id, 3);
      }
      console.log(evt);
    },

    //Function for changing status of task when task is dragged to another list

    changeTaskStatus: async function (taskId, taskStatus) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ status: taskStatus }),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/changetaskstatus/" + taskId,
        requestOptions
      );

      this.changeresponse = await response.json();
    },

    //Filtering each task in appropriate list
    initTasks: function () {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]["status"] == 1)
          this.list1.push({
            name: this.data[i]["name"],
            id: this.data[i]["id"],
            type: this.data[i]["type"],
            status: this.data[i]["status"],
            description: this.data[i]["description"],
            startDate: this.data[i]["startDate"],
            finishDate: this.data[i]["finishDate"],
            user: this.data[i]["user"],
          });
        else if (this.data[i]["status"] == 2)
          this.list2.push({
            name: this.data[i]["name"],
            id: this.data[i]["id"],
            type: this.data[i]["type"],
            status: this.data[i]["status"],
            description: this.data[i]["description"],
            startDate: this.data[i]["startDate"],
            finishDate: this.data[i]["finishDate"],
            user: this.data[i]["user"],
          });
        else
          this.list3.push({
            name: this.data[i]["name"],
            id: this.data[i]["id"],
            type: this.data[i]["type"],
            status: this.data[i]["status"],
            description: this.data[i]["description"],
            startDate: this.data[i]["startDate"],
            finishDate: this.data[i]["finishDate"],
            user: this.data[i]["user"],
          });
      }
    },

    //Selecting task item on click

    take(task) {
      this.$store.task.id = task.id;
      this.$store.task.name = task.name;
      this.$store.task.type = task.type;
      this.$store.task.status = task.status;
      this.$store.task.description = task.description;
      this.$store.task.startDate = task.startDate;
      this.$store.task.finishDate = task.finishDate;
      this.$store.task.userTask = task.user;

      var el = document.getElementById(task.id);
      console.log(el);
      if (this.clicked) {
        this.selected = null;
        this.clicked = false;
        el.style = "background-color': white";
      } else {
        this.selected = task;
        this.clicked = true;
        el.style = "background-color:#ddcef0";
      }
    },
  },
};
</script>

<style>
.row {
  justify-content: center;
}
.buttonClass {
  margin: 10px;
}
.refClass {
  background-color: darkgray;
}
#chose {
  background-color: aqua;
}
.md-tabs {
  background-color: #fac8ee;
}
</style>
