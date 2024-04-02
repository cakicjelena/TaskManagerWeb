<!--Commponent for registration-->
<template>
  <div>
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">User</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first_name">First Name</label>
                <md-input
                  name="first_name"
                  id="first_name"
                  autocomplete="given-name"
                  v-model="form.first_name"
                  :disabled="sending"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last_name">Last Name</label>
                <md-input
                  name="last_name"
                  id="last_name"
                  autocomplete="family-name"
                  v-model="form.last_name"
                  :disabled="sending"
                />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="sex">Gender</label>
                <md-select
                  name="sex"
                  id="sex"
                  v-model="form.sex"
                  md-dense
                  :disabled="sending"
                >
                  <md-option value="1">Male</md-option>
                  <md-option value="0">Female</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-datepicker v-model="form.birthDate">
                <label>Birth Date</label>
              </md-datepicker>
            </div>
          </div>

          <md-field>
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
          </md-field>
          <md-field md-has-password>
            <label>Password</label>
            <md-input v-model="form.password" type="password"></md-input>
          </md-field>
          <md-field md-has-password>
            <label>Confirm Password</label>
            <md-input v-model="form.cpassword" type="password"></md-input>
          </md-field>
          <md-checkbox v-model="form.is_superuser">Admin</md-checkbox>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            @click="register"
            >Register</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { convert } from "@/utilities";
export default {
  name: "FormValidation",
  data: () => ({
    form: {
      first_name: null,
      last_name: null,
      sex: null,
      birthDate: null,
      email: null,
      password: null,
      cpassword: null,
      is_superuser: false,
    },
    sending: false,
  }),

  methods: {
    //Method for registration

    async register() {
      this.sending = true;
      this.form.birthDate = convert(this.form.birthDate);

      if (this.password != this.cpassword) {
        alert("Passwords don't match!");
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(this.form),
      };
      const response = await fetch("http://127.0.0.1:8000/", requestOptions);

      this.data = await response.json();
      this.sending = false;
      this.$router.push({ path: "/home" });
    },

    //Cleaning of form fields

    clearForm() {
      this.$v.$reset();
      this.form.first_name = null;
      this.form.last_name = null;
      this.form.birthDate = null;
      this.form.sex = null;
      this.form.email = null;
      this.form.password = null;
      this.form.cpassword = null;
      this.form.is_superuser = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-layout {
  justify-content: center;
}
</style>
