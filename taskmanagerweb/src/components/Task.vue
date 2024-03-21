<template>
  <div>
    <md-tabs class="md-primary">
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
          @change="log"
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
          @change="log"
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
          @change="log"
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
import { store } from "@/store";
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
    };
  },
  async mounted() {
    this.projectId = store.project.id;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      "http://127.0.0.1:8000/getalltasksofproject/" + store.project.id,
      requestOptions
    );

    this.data = await response.json();
    this.initTasks();
  },
  methods: {
    gototaskdetails(task) {
      store.task.id = task.id;
      store.task.name = task.name;
      store.task.type = task.type;
      store.task.status = task.status;
      store.task.description = task.description;
      store.task.startDate = task.startDate;
      store.task.finishDate = task.finishDate;
      store.task.userTask = task.user;
      this.$router.push({
        name: "taskdetails",
      });
    },
    gotoprojects() {
      this.$router.push({ path: "/projects" });
    },
    gototaskcreate() {
      this.$router.push({
        path: "/taskcreate",
        query: { projectId: this.projectId },
      });
    },
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

    add: function () {
      this.list.push({ name: "Testing" });
    },
    replace: function () {
      this.list = [{ name: "web Design" }];
    },
    clone: function (e1) {
      return {
        name: e1.name + "cloned",
      };
    },
    log: function (evt) {
      console.log(evt);
    },
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
    take(task) {
      store.task.id = task.id;
      store.task.name = task.name;
      store.task.type = task.type;
      store.task.status = task.status;
      store.task.description = task.description;
      store.task.startDate = task.startDate;
      store.task.finishDate = task.finishDate;
      store.task.userTask = task.user;

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
</style>
