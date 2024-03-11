<template>
  <div class="row">
    <div class="col-3">
      <h3>TO DO</h3>
      <draggable class="list-group" :list="list1" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>IN PROGRESS</h3>
      <draggable class="list-group" :list="list2" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>DONE</h3>
      <draggable class="list-group" :list="list3" group="tasks" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list3"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>
    <rawDisplayer class="col-3" :value="list1" title="List 1" />
    <rawDisplayer class="col-3" :value="list2" title="List 2" />
    <rawDisplayer class="col-3" :value="list3" title="List 3" />
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
      list1: [
        { name: " Create Database", id: 1 },
        { name: "Restful api", id: 2 },
        { name: "Fill database", id: 3 },
      ],
      list2: [
        { name: "web Design", id: 4 },
        { name: "Testing", id: 5 },
      ],
      list3: [
        { name: "Fixing bugs", id: 6 },
        { name: "Updating", id: 7 },
      ],
    };
  },
  methods: {
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
      window.console.log(evt);
    },
  },
};
</script>
