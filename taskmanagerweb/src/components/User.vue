<!--Component for list of users-->

<template>
  <div>
    <md-tabs class="md-transparent">
      <md-tab
        id="tab-profile"
        md-label="Profile"
        name="Profile"
        v-on:click="gotoprofile"
      ></md-tab>
    </md-tabs>
    <md-table v-model="data" md-card @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        :class="getClass(item)"
        md-selectable="single"
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
          item.id
        }}</md-table-cell>
        <md-table-cell md-label="First name" md-sort-by="first_name">{{
          item.first_name
        }}</md-table-cell>
        <md-table-cell md-label="Last name" md-sort-by="last_name">{{
          item.last_name
        }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{
          item.email
        }}</md-table-cell>
        <md-table-cell md-label="Gender" v-if="item.sex">Male</md-table-cell>
        <md-table-cell md-label="Gender" v-else>Female</md-table-cell>
        <md-table-cell md-label="BirthDate" md-sort-by="birthDate">{{
          item.birthDate
        }}</md-table-cell>
        <md-table-cell md-label="Admin" md-sort-by="is_superuser">{{
          item.is_superuser
        }}</md-table-cell>
      </md-table-row>
    </md-table>
    <b-form>
      <b-button variant="info" @click="deleteUser" class="buttonClass"
        >DELETE USER</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  name: "UserWidget",
  props: {
    msg: String,
  },
  data() {
    return {
      selected: null,
      data: null,
      response: null,
    };
  },
  async mounted() {
    this.initUser();
  },
  methods: {
    //Method for initialization User component

    async initUser() {
      if (this.$store.allUsers == null) {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          "http://127.0.0.1:8000/getallusers/",
          requestOptions
        );
        this.data = await response.json();
        this.$store.allUsers = this.data;
      } else {
        this.data = this.$store.allUsers;
      }
    },

    //Method that leads to Profile page by clicking on navbar item

    gotoprofile() {
      this.$router.push({ path: "/profile" });
    },

    //Deleting selected user by clicking on button

    async deleteUser() {
      if (this.selected == null) {
        alert("You must select user!");
      } else {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          "http://127.0.0.1:8000/deleteuser/" + this.selected.id,
          requestOptions
        );
        this.response = await response.json();
        this.$router.go();
      }
    },

    //Method for getting class of item

    getClass: ({ id }) => ({
      "md-primary": id === 2,
      "md-accent": id === 3,
    }),

    //Method for selecting item

    onSelect(item) {
      this.selected = item;
    },
  },
};
</script>
<style>
.md-tabs {
  background-color: #fac8ee;
}
</style>
