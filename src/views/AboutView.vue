<template>
  <div class="home-container">
    <div class="header-section">
      <h1>Welcome to Our Charity Health Platform</h1>
      <p>This platform is dedicated to promoting the health and well-being of older adults by providing comprehensive health resources and tools tailored to their needs and those of their caregivers.</p>
    </div>

    <div class="content-section">
      <div class="col-md-6 col-sm-6 text-section mb-3">
        <h2>In this section</h2>
        <ul>
          <li> Lastest health resources</li>
          <li> Community activities and support</li>
          <li> Healthcare center search | VIC and TAS</li>
          <li> A phone call each day to check you're OK</li>
          <li> Volunteer services with local community</li>
        </ul>
      </div>

      <div class="col-md-6 col-sm-6 image-section mb-3">
        <img src="@/assets/ass2.png" alt="Charity Health Platform" />
      </div>
    </div>

    <div class="footer-section">
      <p><strong>Our mission is to create a comprehensive platform that supports older adults and their caregivers.</strong></p>
      <p>This platform provides essential tools and resources, improving access to reliable health information and enabling effective communication with healthcare providers. By addressing the unique challenges faced by older adults, we aim to make a positive impact on their quality of life.</p>
    </div>

    <div class="export-buttons">
      <button @click="exportToPDF" class="btn btn-primary">Export to PDF</button>
      <button @click="exportToCSV" class="btn btn-secondary">Export to CSV</button>
    </div>

  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf';

const exportToPDF = () => {
  const doc = new jsPDF();

  doc.text('Welcome to Our Charity Health Platform', 10, 10);
  doc.text('This platform is dedicated to promoting the health and well-being of older adults...', 10, 20);
  doc.text('In this section:', 10, 30);
  doc.text('- Latest health resources', 10, 40);
  doc.text('- Community activities and support', 10, 50);
  doc.text('- Healthcare center search | VIC and TAS', 10, 60);
  doc.text('- A phone call each day to check you\'re OK', 10, 70);
  doc.text('- Volunteer services with local community', 10, 80);
  
  doc.save('about.pdf');
};

const exportToCSV = () => {
  const csvContent = `
    Section,Details
    Welcome,Welcome to Our Charity Health Platform
    Introduction,This platform is dedicated to promoting the health and well-being of older adults...
    Sections,Latest health resources
    Sections,Community activities and support
    Sections,Healthcare center search | VIC and TAS
    Sections,A phone call each day to check you're OK
    Sections,Volunteer services with local community
  `;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'about.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  text-align: left;
  margin-bottom: 40px;
}

.header-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.header-section p {
  font-size: 1.2rem;
  color: #555;
}

.content-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px; /* Reduce margin for better spacing */
}

.text-section {
  width: 40%;
}

.text-section h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.text-section ul {
  list-style-type: none;
  padding-left: 1rem; /* Indent the list items */
  border-top: 1px solid #ccc;
}

.text-section li {
  font-size: 1rem;
  padding: 8px 0; /* Reduce padding for a more compact look */
  border-bottom: 1px solid #ccc;
}

.image-section {
  width: 55%;
}

.image-section img {
  width: 100%;
  height: auto; 
  border-radius: 10px;
}

.footer-section {
  text-align: left;
  font-size: 1.2rem;
  color: #333;
  margin-top: 20px; 
}

.footer-section p {
  margin-bottom: 15px;
  line-height: 1.6;
}

.footer-section p strong {
  font-weight: bold;
}

.export-buttons .btn {
  margin: 5px 10px; 
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff; 
  color: white;
}

.btn-secondary {
  background-color: #007bff; 
  color: white;
}

</style>