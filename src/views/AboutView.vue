<template>
  <div class="home-container">
    <div class="header-section">
      <h1>Welcome to Our Charity Health Platform</h1>
      <p>This platform is dedicated to promoting the health and well-being of older adults by providing comprehensive health resources and tools tailored to their needs and those of their caregivers.</p>
    </div>

    <div class="image-section mb-3">
      <img src="/ass2.png" alt="Charity Health Platform" />
    </div>

    <div class="content-section">
      <h2>In this section</h2>
      <div class="section-links">
        <!-- Display the links in two columns -->
        <ul>
          <li><a href="#" @click="toggleLatestHealthResources">Latest health resources</a></li>
          <li><a href="#" @click="toggleCommunityActivities">Community activities and support</a></li>
          <li><a href="#" @click="toggleHealthcareCenterSearch">Healthcare center search | VIC</a></li>
          <li><a href="#" @click="togglePhoneCall">A phone call each day to check you're OK</a></li>
          <li><a href="#" @click="toggleVolunteerServices">Volunteer services with local community</a></li>
        </ul>
      </div>
    </div>

    <div v-if="showHealthcareCenterSearch" class="mt-5">
      <h3>Healthcare Center Search</h3>
      <HomeMap />
    </div>

    <div v-if="showCommunityActivities" class="mt-5">
      <h3>Community Activities and Support</h3>
      <DataTable :value="communityActivities" paginator rows="10" :filters="filters" filterDisplay="row" class="p-datatable-gridlines">
        <Column field="name" header="Activity Name" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="date" header="Date" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by date" />
          </template>
        </Column>
        <Column field="location" header="Location" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by location" />
          </template>
        </Column>
        <Column field="description" header="Description" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by description" />
          </template>
        </Column>
        <Column field="participants" header="Participants" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by participants" />
          </template>
        </Column>
      </DataTable>

      <div class="export-buttons">
        <button @click="exportCommunityActivitiesToPDF" class="btn btn-primary">Export to PDF</button>
        <button @click="exportCommunityActivitiesToCSV" class="btn btn-secondary">Export to CSV</button>
      </div>
    </div>
    
    <div v-if="showVolunteerServices" class="mt-5">
      <h3>Volunteer Services with Local Community</h3>
      <DataTable :value="volunteerServices" paginator rows="10" :filters="filters" filterDisplay="row" class="p-datatable-gridlines">
        <Column field="service" header="Volunteer Service" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by service" />
          </template>
        </Column>
        <Column field="date" header="Date" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by date" />
          </template>
        </Column>
        <Column field="location" header="Location" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by location" />
          </template>
        </Column>
        <Column field="description" header="Description" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by description" />
          </template>
        </Column>

        <Column field="volunteersNeeded" header="Volunteers Needed" sortable>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by volunteers needed" />
          </template>
        </Column>

      </DataTable>

      <div class="export-buttons">
        <button @click="exportCommunityActivitiesToPDF" class="btn btn-primary">Export to PDF</button>
        <button @click="exportCommunityActivitiesToCSV" class="btn btn-secondary">Export to CSV</button>
      </div>
    </div>

    <div class="footer-section">
      <p><strong>Our mission is to create a comprehensive platform that supports older adults and their caregivers.</strong></p>
      <p>This platform provides essential tools and resources, improving access to reliable health information and enabling effective communication with healthcare providers. By addressing the unique challenges faced by older adults, we aim to make a positive impact on their quality of life.</p>
    </div>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import HomeMap from '@/components/HomeMap.vue';

const showHealthcareCenterSearch = ref(false);
const showCommunityActivities = ref(false);
const showVolunteerServices = ref(false);

const filters = ref({
  name: { value: null, matchMode: 'contains' },
  date: { value: null, matchMode: 'contains' },
  location: { value: null, matchMode: 'contains' },
  description: { value: null, matchMode: 'contains' },
  participants: { value: null, matchMode: 'contains' },
  service: { value: null, matchMode: 'contains' },
  volunteersNeeded: { value: null, matchMode: 'contains' }
});

const communityActivities = ref([
  { name: 'Yoga for Seniors', date: '2024-10-15', location: 'Melbourne CBD', description: 'A yoga session designed for senior citizens', participants: 20 },
  { name: 'Health Talk: Diabetes', date: '2024-10-20', location: 'South Yarra', description: 'An informative session on diabetes', participants: 35 },
  { name: 'Senior Walking Club', date: '2024-10-22', location: 'Fitzroy', description: 'A walking group for seniors to stay active', participants: 15 },
  { name: 'Community Gardening', date: '2024-11-01', location: 'St Kilda', description: 'Gardening with the local community', participants: 25 },
  { name: 'Memory Care Workshop', date: '2024-11-10', location: 'Richmond', description: 'Workshop on memory care for elderly', participants: 30 },
  { name: 'Art Therapy for Seniors', date: '2024-11-15', location: 'Carlton', description: 'Art therapy for relaxation and creativity', participants: 18 },
  { name: 'Elderly Nutrition Workshop', date: '2024-11-20', location: 'Docklands', description: 'Learn about healthy nutrition for seniors', participants: 40 },
  { name: 'Music Therapy for Seniors', date: '2024-11-25', location: 'Collingwood', description: 'Relaxing music therapy session for seniors', participants: 28 },
  { name: 'Tai Chi in the Park', date: '2024-12-01', location: 'Hawthorn', description: 'Tai Chi exercises for balance and health', participants: 22 },
  { name: 'Gardening and Planting Workshop', date: '2024-12-05', location: 'Brunswick', description: 'Learn to plant and garden with the community', participants: 30 },
  { name: 'Elderly Craft Workshop', date: '2024-12-10', location: 'Kensington', description: 'A fun craft-making workshop for seniors', participants: 20 },
  { name: 'Senior Movie Night', date: '2024-12-12', location: 'Footscray', description: 'An outdoor movie screening for senior citizens', participants: 50 },
  { name: 'Mental Wellness Seminar', date: '2024-12-15', location: 'Port Melbourne', description: 'Seminar on mental health for the elderly', participants: 40 }
]);

const volunteerServices = ref([
  { service: 'Meals on Wheels', date: '2024-10-18', location: 'Melbourne CBD', description: 'Deliver meals to the elderly in the city center', volunteersNeeded: 10 },
  { service: 'Senior Citizen Home Assistance', date: '2024-10-25', location: 'South Yarra', description: 'Help with household tasks for senior citizens', volunteersNeeded: 12 },
  { service: 'Reading for the Blind', date: '2024-11-05', location: 'Fitzroy', description: 'Volunteer to read for visually impaired seniors', volunteersNeeded: 8 },
  { service: 'Charity Walk Coordination', date: '2024-11-12', location: 'St Kilda', description: 'Assist with organizing a charity walk for senior health', volunteersNeeded: 15 },
  { service: 'Medical Escort Service', date: '2024-11-20', location: 'Richmond', description: 'Escort seniors to their medical appointments', volunteersNeeded: 6 },
  { service: 'Community Garden Assistance', date: '2024-11-25', location: 'Carlton', description: 'Help seniors with community gardening tasks', volunteersNeeded: 10 },
  { service: 'Art Workshop Assistant', date: '2024-12-01', location: 'Docklands', description: 'Assist in running art therapy workshops for seniors', volunteersNeeded: 5 },
  { service: 'Elderly Caregiver Relief', date: '2024-12-05', location: 'Hawthorn', description: 'Provide relief to primary caregivers by spending time with seniors', volunteersNeeded: 7 },
  { service: 'Music Therapy Sessions', date: '2024-12-10', location: 'Brunswick', description: 'Assist with music therapy sessions for elderly care homes', volunteersNeeded: 6 },
  { service: 'Holiday Gift Delivery', date: '2024-12-15', location: 'Collingwood', description: 'Help deliver holiday gifts to seniors living alone', volunteersNeeded: 12 },
  { service: 'Companion for Seniors', date: '2024-12-18', location: 'Footscray', description: 'Spend quality time with seniors in elderly homes', volunteersNeeded: 9 },
  { service: 'Food Drive Helper', date: '2024-12-20', location: 'Melbourne CBD', description: 'Assist in organizing and distributing food packages for seniors', volunteersNeeded: 20 },
  { service: 'Senior Event Photography', date: '2024-12-22', location: 'Southbank', description: 'Help take photographs of events and activities for senior groups', volunteersNeeded: 3 }
]);

const toggleHealthcareCenterSearch = () => {
  showHealthcareCenterSearch.value = !showHealthcareCenterSearch.value;
  showCommunityActivities.value = false;
  showVolunteerServices.value = false;  
};

const toggleCommunityActivities = () => {
  showCommunityActivities.value = !showCommunityActivities.value;
  showVolunteerServices.value = false;
  showHealthcareCenterSearch.value = false;
};

const toggleVolunteerServices = () => {
  showVolunteerServices.value = !showVolunteerServices.value;
  showCommunityActivities.value = false;
  showHealthcareCenterSearch.value = false;
};

const exportCommunityActivitiesToPDF = () => {
  const doc = new jsPDF();

  doc.text('Community Activities and Support', 10, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Activity Name', 'Date', 'Location', 'Description', 'Participants']],
    body: communityActivities.value.map(activity => [
      activity.name, 
      activity.date, 
      activity.location, 
      activity.description, 
      activity.participants
    ])
  });

  doc.save('community_activities.pdf');
};

const exportCommunityActivitiesToCSV = () => {
  let csvContent = "Activity Name,Date,Location,Description,Participants\n";

  communityActivities.value.forEach(activity => {
    csvContent += `${activity.name},${activity.date},${activity.location},${activity.description},${activity.participants}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'community_activities.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportVolunteerServicesToPDF = () => {
  const doc = new jsPDF();

  doc.text('Volunteer Services with Local Community', 10, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Volunteer Service', 'Date', 'Location', 'Description', 'Volunteers Needed']],
    body: volunteerServices.value.map(service => [
      service.service, 
      service.date, 
      service.location, 
      service.description, 
      service.volunteersNeeded
    ])
  });

  doc.save('volunteer_services.pdf');
};

const exportVolunteerServicesToCSV = () => {
  let csvContent = "Volunteer Service,Date,Location,Description,Volunteers Needed\n";

  volunteerServices.value.forEach(service => {
    csvContent += `${service.service},${service.date},${service.location},${service.description},${service.volunteersNeeded}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'volunteer_services.csv');
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

.image-section img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

h3 {
  font-size: 1.2rem; 
  font-weight: bold; 
}

.content-section {
  margin-top: 20px;
  text-align: left;
}

.content-section h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.section-links {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between; 
}

.section-links ul {
  list-style-type: none;
  width: 45%; 
  margin-bottom: 0;
}

.section-links li {
  font-size: 1.1rem;
  padding: 8px 0;
  font-weight: bold;
}

.section-links a {
  color: #007bff;
  font-size: 1.1rem;
  text-decoration: none;
  font-weight: bold;
}

.section-links a:hover {
  text-decoration: underline;
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