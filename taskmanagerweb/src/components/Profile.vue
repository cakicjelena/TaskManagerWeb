<template>
  <div>
    <label for="first_name">{{ "First name:" + first_name }} </label>
    <label for="last_name">{{ "Last name:" + last_name }} </label>
    <label for="email">{{ "Email:" + email }} </label>
    <label for="sex">{{ "Sex:" + sex }} </label>
    <label for="birthDate">{{ "Birth date:" + birthDate }} </label>
    <label for="is_superuser">{{ "Admin:" + is_superuser }} </label>
  </div>
</template>
<script>
export default {
  name: "ProfileWidget",
  props: {
    first_name: String,
    last_name: String,
    email: String,
    sex: Number,
    birthDate: Date,
    is_superuser: Number,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {},
};
</script>
