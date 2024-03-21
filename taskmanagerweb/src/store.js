// store.js
import { reactive } from "vue";

export const store = reactive({
  user: {
    id: null,
    first_name: null,
    last_name: null,
    sex: null,
    birthDate: null,
    email: null,
    password: null,
    cpassword: null,
  },
  project: {
    id: null,
    name: null,
    createDate: null,
    deadlineDate: null,
    description: null,
    projectManagerId: null,
    users: null,
  },
  task: {
    id: null,
    name: null,
    type: null,
    status: null,
    description: null,
    startDate: null,
    finishDate: null,
    comments: null,
    userTask: null,
  },
  allUsers: null,
  allProjects: null,
});
