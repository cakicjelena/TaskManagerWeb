<template>
  <div class="col-md-6" id="registerform">
    <b-form>
      <b-form-group id="input-group-1" label="First name:" label-for="input-1">
        <b-form-input
          :value="first_name"
          @input="(event) => (first_name = event.target.value)"
          v-model="first_name"
          id="input-1"
          type="first_name"
          placeholder="Enter first name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Last name:" label-for="input-2">
        <b-form-input
          :value="last_name"
          @input="(event) => (last_name = event.target.value)"
          v-model="last_name"
          id="input-2"
          type="last_name"
          placeholder="Enter last name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Email:" label-for="input-3">
        <b-form-input
          :value="email"
          @input="(event) => (email = event.target.value)"
          v-model="email"
          id="input-3"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <label for="password">Password:</label>
      <b-form-input
        :value="password"
        @input="(event) => (password = event.target.value)"
        v-model="password"
        type="password"
        placeholder="Enter password"
        id="password"
        aria-describedby="password-help-block"
      ></b-form-input>
      <label for="password">Confirm password:</label>
      <b-form-input
        :value="password"
        @input="(event) => (password = event.target.value)"
        v-model="password"
        type="password"
        placeholder="Confirm password"
        id="password"
        aria-describedby="password-help-block"
      ></b-form-input>
      <b-form-group label="Sex:" v-slot="{ ariaDescribedby }">
        <b-form-radio
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="M"
          >M</b-form-radio
        >
        <b-form-radio
          v-model="selected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          value="F"
          >F</b-form-radio
        >
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "RegistrationWidget",
  props: {
    msg: String,
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {},
};
</script>
