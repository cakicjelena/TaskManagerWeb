<template>
  <md-content class="md-content">
    <md-card class="home-card">
      <md-card-media>
        <img
          class="img"
          src="https://static.vecteezy.com/system/resources/previews/028/749/995/non_2x/task-manager-icon-vector.jpg"
        />
      </md-card-media>
      <md-card-header>
        <div class="md-title">Task Manager</div>
      </md-card-header>
      <md-card-content>
        <p>Task Manager is an application for project task management</p>
      </md-card-content>
    </md-card>
  </md-content>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.md-content {
  display: contents;
}
.home-card {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}
.md-card .md-title {
  font-size: 35px;
  font-style: initial;
}
.md-card-content {
  font-size: 18px;
}
.img {
  max-width: 100px;
  max-height: 100px;
}
</style>
