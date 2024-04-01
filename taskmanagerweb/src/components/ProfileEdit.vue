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
    <form novalidate class="md-layout">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Edit profile</div>
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
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-raised md-primary"
            :disabled="sending"
            @click="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
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
    },
    sending: false,
  }),
  mounted() {
    this.form.first_name = this.$session.get("first_name");
    this.form.last_name = this.$session.get("last_name");
    this.form.birthDate = this.$session.get("birthDate");
    this.form.sex = this.$session.get("sex");
    this.form.email = this.$session.get("email");
    this.form.password = this.$session.get("password");
    this.form.cpassword = this.$session.get("cpassword");
  },
  methods: {
    async gotoprofile() {
      this.$router.push({ path: "/profile" });
    },
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
    async submit() {
      this.loading = true;
      if (this.password != this.cpassword) {
        alert("Passwords don't match!");
      }
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.form),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/editprofile/" + this.$session.get("id"),
        requestOptions
      );

      this.data = await response.json();
      //this.loading = false;
      this.$store.user.id = this.data["id"];
      this.$store.user.first_name = this.data["first_name"];
      this.$store.user.last_name = this.data["last_name"];
      this.$store.user.email = this.data["email"];
      this.$store.user.sex = this.data["sex"];
      this.$store.user.birthDate = this.data["birthDate"];
      this.$store.user.is_superuser = this.data["is_superuser"];
      this.$session.set("id", this.data["id"]);
      this.$session.set("first_name", this.data["first_name"]);
      this.$session.set("last_name", this.data["last_name"]);
      this.$session.set("email", this.data["email"]);
      this.$session.set("sex", this.data["sex"]);
      this.$session.set("birthDate", this.data["birthDate"]);
      this.$session.set("is_superuser", this.data["is_superuser"]);
      alert("Successfully edited profile!");
      //this.$router.push({ name: "profile" });
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
.md-tabs {
  background-color: #fac8ee;
}
</style>
