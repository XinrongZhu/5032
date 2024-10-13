<template>
  <div class="email-container">
    <h2 class="text-center">📧 Send an Email to Administrator</h2>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" id="name" type="text" placeholder="Name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="to" id="email" type="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="subject" id="subject" type="text" placeholder="Subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="text" id="message" placeholder="Message" required></textarea>
      </div>
      <div class="form-group">
        <label for="attachment">Attachment</label>
        <input id="attachment" type="file" @change="handleFileUpload">
      </div>
      <button type="submit" class="send-button">Send Email</button>
      <button type="button" class="clear-button" @click="clearForm">Clear</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const name = ref('');
    const to = ref('');
    const subject = ref('');
    const text = ref('');
    const attachment = ref(null);

    const sendEmail = async () => {
      try {
        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('to', to.value);
        formData.append('subject', subject.value);
        formData.append('text', text.value);
        if (attachment.value) {
          formData.append('attachment', attachment.value);
        }

        await axios.post('http://localhost:3000/api/send-email', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        alert('Email sent successfully!');
        clearForm();
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      }
    };

    const handleFileUpload = (event) => {
      attachment.value = event.target.files[0];
    };

    const clearForm = () => {
      name.value = '';
      to.value = '';
      subject.value = '';
      text.value = '';
      attachment.value = null;
    };

    return {
      name,
      to,
      subject,
      text,
      attachment,
      sendEmail,
      handleFileUpload,
      clearForm,
    };
  },
};
</script>

<style scoped>
.email-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: vertical;
  height: 150px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button {
  background-color: #007bff;
  color: white;
}

.clear-button {
  background-color: #6c757d;
  color: white;
}
</style>
