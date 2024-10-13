import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAqPNS-XEikKMUTDtYY5yvF6pb2SceeKt8",
  authDomain: "assignment5032-8c0f6.firebaseapp.com",
  projectId: "assignment5032-8c0f6",
  storageBucket: "assignment5032-8c0f6.appspot.com",
  messagingSenderId: "411624631634",
  appId: "1:411624631634:web:ab20d2c0e4ca34bfe65e8b"
};

initializeApp(firebaseConfig);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.use(router)

app.mount('#app')

