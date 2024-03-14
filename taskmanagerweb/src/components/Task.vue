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
            :key="element.name"
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
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
    <br />
    <br />
    <b-button variant="info" @click="taskdelete">Delete task</b-button>
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
    };
  },
  async mounted() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      "http://127.0.0.1:8000/getalltasksofproject/" + this.$route.query.id,
      requestOptions
    );

    this.data = await response.json();
    this.initTasks();
    // alert(this.data);
  },
  methods: {
    gotoprojects() {
      this.$router.push({ path: "/projects" });
    },
    gototaskcreate() {
      this.$router.push({ path: "/taskcreate" });
    },
    taskdelete() {},
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
      alert(evt);
    },
    initTasks: function () {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i]["status"] == 1)
          this.list1.push({ name: this.data[i]["name"] });
        else if (this.data[i]["status"] == 2)
          this.list2.push({ name: this.data[i]["name"] });
        else this.list3.push({ name: this.data[i]["name"] });
      }
    },
  },
};
</script>

<style>
.row {
  justify-content: center;
}
</style>
