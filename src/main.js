import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import './style.css'
import App from './App.vue'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import InputText from 'primevue/inputtext';

import Button from 'primevue/button';

const app = createApp(App)
console.log(import.meta.env.VITE_APP_BACKEND_URL)
app.use(PrimeVue);
app.mount('#app')
app.component('InputText',InputText);
app.component('Button',Button);