<template>
  <div class="admin-dashboard container mt-5">
    <h1 class="text-center">Admin Dashboard</h1>
    <p class="text-center">Welcome, {{ loggedInUser.username }}! You have admin privileges.</p>

    <div class="card mt-5">
      <div class="card-header">Admin Functions</div>
      <div class="card-body">
        <ul>
          <li><a href="#" @click="showUserTable = !showUserTable">Manage Users</a></li>
          <li><a href="#" @click="getUserCount">Users Count: {{ userCount !== null ? userCount : 'Click to Fetch' }}</a></li>
        </ul>
      </div>
    </div>

    <div v-if="showUserTable" class="mt-5">
      <h3>Manage Users</h3>
      <DataTable :value="users" paginator rows="10" :filters="filters" class="p-datatable-gridlines">
        <Column field="username" header="Username" sortable filter></Column>
        <Column field="email" header="Email" sortable filter></Column>
        <Column field="phone" header="Phone" sortable filter></Column>
        <Column field="gender" header="Gender" sortable filter></Column>
        <Column field="isAustralian" header="Is Australian" sortable filter></Column>
      </DataTable>
    </div>

    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, collection, getDocs, getDoc } from 'firebase/firestore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';

// Initialize Firebase Auth and Firestore
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

// Reactive data variables
const loggedInUser = ref({
  username: ''
});
const userCount = ref(null);
const error = ref(null);
const isAdmin = ref(false); 
const showUserTable = ref(false); 
const users = ref([]); 
const filters = ref({});

// Fetch all users from Firestore
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    users.value = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,  
        ...doc.data() 
      };
    });
    console.log('Users fetched:', users.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Fetch user count from API
const getUserCount = async () => {
  try {
    const response = await axios.get('https://countusers-gq4pcqhgna-uc.a.run.app');
    userCount.value = response.data.count;
    error.value = null;
  } catch (err) {
    console.error('Error fetching user count:', err);
    error.value = 'Failed to fetch user count.';
    userCount.value = null;
  }
};

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Get the Firestore user document
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          loggedInUser.value.username = userData.username;

          // Check if the user is an admin
          if (userData.role === 'admin') {
            isAdmin.value = true; 
            fetchUsers();  // Fetch all users once the admin logs in
          } else {
            // If the user is not an admin, redirect them to the home page
            alert('Successfully logged in.');
            router.push('/');
          }
        } else {
          console.error('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/');
      }
    } else {
      // If not logged in, redirect to login
      alert('Only administrators can view it.');
      router.push('/');
    }
  });
});

</script>

<style scoped>
.text-center {
  text-align: center;
}

h3 {
  font-size: 1.2rem; 
  font-weight: bold; 
}

.mt-5 {
  margin-top: 3rem;
}
</style>
