<template>
  <div class="home-container">
    <div class="header-section">
      <h1>Welcome to Our Charity Health Platform</h1>
      <p>This platform is dedicated to promoting the health and well-being of older adults by providing comprehensive health resources and tools tailored to their needs and those of their caregivers.</p>
    </div>

    <div class="content-section">
      <div class="text-section">
        <h2>In this section</h2>
        <ul>
          <li> Lastest health resources</li>
          <li> Community activities and support</li>
          <li> Healthcare center search | VIC and TAS</li>
          <li> A phone call each day to check you're OK</li>
          <li> Volunteer services with local community</li>
        </ul>
      </div>

      <div class="image-section">
        <img src="@/assets/ass2.png" alt="Charity Health Platform" />
      </div>
    </div>

    <div class="footer-section">
      <p><strong>Our mission is to create a comprehensive platform that supports older adults and their caregivers.</strong></p>
      <p>This platform provides essential tools and resources, improving access to reliable health information and enabling effective communication with healthcare providers. By addressing the unique challenges faced by older adults, we aim to make a positive impact on their quality of life.</p>
    </div>
  </div>
</template>

<script setup>
// No script required for this layout
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
</style>