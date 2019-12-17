<template>
  <div style="padding: 40px;">
    <h1>Mail</h1>
    <form @submit.prevent="sendMail">
      <div class="form-group">
        Subject
        <input type="text" v-model="form.subject" required />
      </div>

      <div class="form-group">
        To
        <input type="email" v-model="form.to" required />
      </div>

      <div class="form-group">
        From
        <input type="email" v-model="form.from" required />
      </div>

      <div class="form-group">
        Message
        <textarea v-model="form.message" required></textarea>
      </div>
      <button type="submit">Send Mail</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    form: {
      to: "",
      from: "",
      subject: "",
      message: ""
    }
  }),
  methods: {
    async sendMail() {
      console.log(this.form)
      const response = await axios.post("mail", this.form);

      console.log(response.data);
    }
  }
};
</script>
