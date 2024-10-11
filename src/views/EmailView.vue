<template>
  <div class="email-container">
    <div class="email-box">
      <h1 class="email-title"><i class="fas fa-envelope"></i> 📧 Send an Email to Administrator</h1>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="formData.name"
            required
          />
        </div>

        <div class="form-group">
          <label for="subject" class="form-label">Subject</label>
          <input
            type="text"
            class="form-control"
            id="subject"
            v-model="formData.subject"
            required
          />
        </div>

        <div class="form-group">
          <label for="message" class="form-label">Message</label>
          <textarea
            class="form-control"
            id="message"
            v-model="formData.message"
            rows="5"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="attachment" class="form-label">Attachment</label>
          <input
            type="file"
            class="form-control"
            id="attachment"
            @change="handleFileUpload"
          />
          <div v-if="attachment" class="text-muted">File: {{ attachment.name }}</div>
        </div>

        <div v-if="errors.general" class="text-danger text-center">
          {{ errors.general }}
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">Send Email</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  name: '',  
  subject: '',
  message: ''
});

// Store the uploaded file
const attachment = ref(null); 

const errors = ref({
  general: null
});

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    attachment.value = file;
  }
};

// Send email
const sendEmail = async () => {
  try {
    const response = await axios.post('http://localhost:5000/send-email', {
      name: formData.value.name,   
      email: formData.value.email,     
      subject: formData.value.subject,
      message: formData.value.message
    });

    alert('Email sent successfully!');
    clearForm();
  } catch (error) {
    errors.value.general = 'Failed to send email. Please try again.';
  }
};

// Clear form data
const clearForm = () => {
  formData.value.name = ''; 
  formData.value.subject = '';
  formData.value.message = '';
  attachment.value = null;
  errors.value.general = null;
};
</script>

<style scoped>
.email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.email-box {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.email-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.email-title i {
  margin-right: 10px;
  color: #3c87d4;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
