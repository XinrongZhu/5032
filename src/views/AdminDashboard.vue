<template>
  <div class="admin-dashboard container mt-5">
    <h1 class="text-center">Admin Dashboard</h1>
    <p class="text-center">Welcome, {{ loggedInUser.username }}! You have admin privileges.</p>

    <!-- logout -->
    <div class="text-center mt-4">
      <button @click="logout" class="btn btn-outline-danger">Logout</button>
    </div>

    <div class="card mt-5">
      <div class="card-header">Admin Functions</div>
      <div class="card-body">
        <ul>
          <li>Manage Users</li>
          <li>View Reports</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


// Initializatize Firebase Auth and Firestore
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

// Stores logged-in user information
const loggedInUser = ref({
  username: ''
});

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get the Firestore for the current user
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        loggedInUser.value.username = userDoc.data().username;
      } else {
        console.error('No such user document!');
        loggedInUser.value.username = 'Unknown User'; 
      }
    } else {
      router.push('/login');
    }
  });
});

// Logout
const logout = async () => {
  try {
    await signOut(auth);
    router.push('/');  
  } catch (error) {
    console.error('Error logging out:', error);
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mt-5 {
  margin-top: 3rem;
}
</style>